/**
 * Servicio de autenticación.
 * 
 * Contiene la lógica principal del proceso de autenticación y autorización:
 * - Registro de nuevos clientes
 * - Inicio de sesión para administradores, clientes y empleados
 * - Generación y validación de tokens JWT
 * 
 * Se apoya en los servicios de `Administrador`, `Cliente` y `Empleado`
 * para realizar la búsqueda de usuarios según el tipo.
 */

import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { ClienteService } from '../cliente/cliente.service';
import { AdministradorService } from '../administrador/administrador.service';
import { EmpleadoService } from '../empleado/empleado.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly clienteService: ClienteService,
        private readonly adminService: AdministradorService,
        private readonly empleadoService: EmpleadoService,
    ) {}

    /**
     * Registra un nuevo cliente en el sistema.
     * 
     * @param dto - Datos del cliente a registrar.
     * @returns Mensaje de éxito y datos del cliente creado.
     * @throws BadRequestException - Si el correo ya está registrado.
     */
    async registerCliente(dto: RegisterDto) {
        try {
            const hash = await argon2.hash(dto.contrasena);

            const nuevoCliente = await this.clienteService.create({
                cli_nombre: dto.nombre,
                cli_correo: dto.correo,
                cli_contrasena: hash,
                cli_telefono: dto.telefono,
                cli_direccion: dto.direccion,
            });

            delete (nuevoCliente as any).cli_contrasena;

            return {
                message: 'Cliente registrado correctamente',
                cliente: nuevoCliente,
            };
        } catch (error) {
            if ((error as any).code === '23505') {
                throw new BadRequestException('El correo ya está registrado');
            }
            throw error;
        }
    }

    /**
     * Inicia sesión para administradores, clientes o empleados.
     * 
     * @param dto - Credenciales de acceso (correo y contraseña).
     * @returns Token JWT y tipo de usuario autenticado.
     * @throws UnauthorizedException - Si las credenciales son inválidas.
     */
    async login(dto: LoginDto) {
        const { correo, contrasena } = dto;

        // 1. Validar administrador
        const admin = await this.adminService.findByCorreo(correo);
        if (admin && admin.adm_contrasena && await argon2.verify(admin.adm_contrasena, contrasena)) {
            const token = await this.generarToken({ id: admin.adm_id, rol: 'admin' });
            return { message: 'Inicio de sesión exitoso', tipo: 'Administrador', token };
        }

        // 2. Validar cliente
        const cliente = await this.clienteService.findByCorreo(correo);
        if (cliente && cliente.cli_contrasena && await argon2.verify(cliente.cli_contrasena, contrasena)) {
            const token = await this.generarToken({ id: cliente.cli_id, rol: 'cliente' });
            return { message: 'Inicio de sesión exitoso', tipo: 'Cliente', token };
        }

        // 3. Validar empleado
        const empleado = await this.empleadoService.findByCorreo(correo);
        if (empleado && empleado.emp_contrasena && await argon2.verify(empleado.emp_contrasena, contrasena)) {
            const token = await this.generarToken({ id: empleado.emp_id, rol: 'empleado' });
            return { message: 'Inicio de sesión exitoso', tipo: 'Empleado', token };
        }

        throw new UnauthorizedException('Credenciales inválidas');
    }

    /**
     * Genera un token JWT firmado con los datos del usuario.
     * 
     * @param payload - Objeto que contiene el ID y rol del usuario.
     * @returns Token JWT firmado.
     */
    async generarToken(payload: { id: number; rol: string }) {
        return this.jwtService.signAsync(payload);
    }

    /**
     * Valida un usuario a partir del token JWT.
     * 
     * @param payload - Contenido decodificado del token.
     * @returns Datos del usuario autenticado.
     * @throws UnauthorizedException - Si el token es inválido o el usuario no existe.
     */
    async validarUsuario(payload: any) {
        if (payload.rol === 'admin') {
            const admin = await this.adminService.findOne(payload.id);
            if (admin) {
                delete (admin as any).adm_contrasena;
                return { ...admin, rol: 'admin' };
            }
        }

        if (payload.rol === 'cliente') {
            const cliente = await this.clienteService.findOne(payload.id);
            if (cliente) {
                delete (cliente as any).cli_contrasena;
                return { ...cliente, rol: 'cliente' };
            }
        }

        if (payload.rol === 'empleado') {
            const empleado = await this.empleadoService.findOne(payload.id);
            if (empleado) {
                delete (empleado as any).emp_contrasena;
                return { ...empleado, rol: 'empleado' };
            }
        }

        throw new UnauthorizedException('Token inválido o usuario no encontrado');
    }
}
