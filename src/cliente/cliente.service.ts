/**
 * Servicio que implementa la lógica de negocio relacionada con los clientes.
 * 
 * Gestiona operaciones CRUD, verificación de contraseñas y sanitización
 * de datos sensibles. Utiliza TypeORM para las consultas a la base de datos
 * y Argon2 para el cifrado seguro de contraseñas.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dtos/create-cliente.dto';
import { UpdateClienteDto } from './dtos/update-cliente.dto';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>,
    ) {}

    /**
     * Crea un nuevo cliente en el sistema.
     * 
     * @param dto - Datos del cliente a crear.
     * @returns Cliente creado sin la contraseña.
     */
    async create(dto: CreateClienteDto): Promise<Cliente> {
        const cliente = this.clienteRepository.create(dto);

        if (dto.cli_contrasena) {
            cliente.cli_contrasena = await argon2.hash(dto.cli_contrasena);
        }

        const saved = await this.clienteRepository.save(cliente);
        return this.sanitizeCliente(saved);
    }

    /**
     * Busca un cliente por su correo electrónico.
     * 
     * @param correo - Correo del cliente.
     * @returns Cliente encontrado o `null` si no existe.
     */
    async findByCorreo(correo: string): Promise<Cliente | null> {
        const cliente = await this.clienteRepository.findOne({ where: { cli_correo: correo } });
        return cliente ? this.sanitizeCliente(cliente) : null;
    }

    /**
     * Obtiene la lista completa de clientes registrados.
     * 
     * @returns Arreglo de clientes (sin contraseñas).
     */
    async findAll(): Promise<Cliente[]> {
        const clientes = await this.clienteRepository.find({
            relations: ['ventas', 'mascotas'],
        });
        return clientes.map(c => this.sanitizeCliente(c));
    }

    /**
     * Busca un cliente por su identificador único.
     * 
     * @param id - ID del cliente.
     * @returns Cliente encontrado.
     * @throws NotFoundException - Si el cliente no existe.
     */
    async findOne(id: number): Promise<Cliente> {
        const cliente = await this.clienteRepository.findOne({
            where: { cli_id: id },
            relations: ['ventas', 'mascotas'],
        });

        if (!cliente) throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
        return this.sanitizeCliente(cliente);
    }

    /**
     * Actualiza los datos de un cliente existente.
     * 
     * @param id - ID del cliente a actualizar.
     * @param dto - Nuevos datos del cliente.
     * @returns Cliente actualizado (sin contraseña).
     */
    async update(id: number, dto: UpdateClienteDto): Promise<Cliente> {
        const cliente = await this.findOne(id);

        if (dto.cli_contrasena) {
            dto.cli_contrasena = await argon2.hash(dto.cli_contrasena);
        }

        Object.assign(cliente, dto);
        const updated = await this.clienteRepository.save(cliente);
        return this.sanitizeCliente(updated);
    }

    /**
     * Elimina un cliente del sistema.
     * 
     * @param id - ID del cliente a eliminar.
     */
    async remove(id: number): Promise<void> {
        const cliente = await this.findOne(id);
        await this.clienteRepository.remove(cliente);
    }

    /**
     * Verifica si la contraseña proporcionada coincide con la almacenada.
     * 
     * @param cli_correo - Correo del cliente.
     * @param contrasena - Contraseña en texto plano.
     * @returns `true` si es válida, `false` en caso contrario.
     */
    async verificarContrasena(cli_correo: string, contrasena: string): Promise<boolean> {
        const cliente = await this.clienteRepository.findOne({ where: { cli_correo } });
        if (!cliente?.cli_contrasena) return false;
        return await argon2.verify(cliente.cli_contrasena, contrasena);
    }

    /**
     * Elimina información sensible antes de devolver los datos al cliente.
     * 
     * @param cliente - Objeto Cliente completo.
     * @returns Cliente sin el campo de contraseña.
     */
    private sanitizeCliente(cliente: Cliente): Cliente {
        const { cli_contrasena, ...safeData } = cliente;
        return safeData as Cliente;
    }
}
