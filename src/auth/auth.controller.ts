/**
 * Controlador encargado de la autenticación de usuarios.
 * 
 * Define las rutas públicas para:
 * - Registro de clientes
 * - Inicio de sesión (login)
 * - Consulta del perfil autenticado
 * 
 * Usa los servicios de autenticación (`AuthService`) para procesar las solicitudes.
 */

import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * Registra un nuevo cliente en el sistema.
     * 
     * @param dto - Datos de registro del cliente.
     * @returns Objeto con mensaje de éxito y datos del cliente creado.
     */
    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.authService.registerCliente(dto);
    }

    /**
     * Inicia sesión para cualquier tipo de usuario (admin, cliente o empleado).
     * 
     * @param dto - Credenciales de acceso (correo y contraseña).
     * @returns Token JWT y tipo de usuario autenticado.
     */
    @Post('login')
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    /**
     * Obtiene los datos del usuario autenticado a partir del token JWT.
     * 
     * @param req - Objeto Request que contiene el usuario autenticado.
     * @returns Información básica del usuario autenticado.
     */
    @UseGuards(AuthGuard('jwt'))
    @Get('perfil')
    async getPerfil(@Request() req) {
        return req.user;
    }
}
