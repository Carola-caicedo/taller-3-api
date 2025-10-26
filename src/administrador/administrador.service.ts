/**
 * Servicio encargado de la lógica de negocio para la gestión de administradores.
 *
 * Este servicio maneja todas las operaciones relacionadas con la entidad `Administrador`,
 * incluyendo la creación, actualización, eliminación, búsqueda y validación de contraseñas.
 * 
 * Utiliza TypeORM para interactuar con la base de datos y la librería Argon2
 * para el cifrado seguro de contraseñas.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { Administrador } from './entities/administrador.entity';
import { CreateAdministradorDto } from './dtos/create-administrador.dto';
import { UpdateAdministradorDto } from './dtos/update-administrador.dto';

@Injectable()
export class AdministradorService {
    constructor(
        @InjectRepository(Administrador)
        private readonly adminRepository: Repository<Administrador>,
    ) {}

    /**
     * Crea un nuevo administrador en la base de datos.
     * 
     * @param dto - Datos del nuevo administrador.
     * @returns El administrador creado (sin incluir la contraseña).
     */
    async create(dto: CreateAdministradorDto): Promise<Administrador> {
        const admin = this.adminRepository.create(dto);

        if (dto.adm_contrasena) {
            admin.adm_contrasena = await argon2.hash(dto.adm_contrasena);
        }

        const saved = await this.adminRepository.save(admin);
        return this.sanitizeAdmin(saved);
    }

    /**
     * Busca un administrador por su correo electrónico.
     * 
     * @param adm_correo - Correo del administrador.
     * @returns El administrador encontrado o `null` si no existe.
     */
    async findByCorreo(adm_correo: string): Promise<Administrador | null> {
        const admin = await this.adminRepository.findOne({ where: { adm_correo } });
        return admin ? this.sanitizeAdmin(admin) : null;
    }

    /**
     * Obtiene la lista completa de administradores.
     * 
     * @returns Arreglo con todos los administradores (sin contraseñas).
     */
    async findAll(): Promise<Administrador[]> {
        const admins = await this.adminRepository.find();
        return admins.map(a => this.sanitizeAdmin(a));
    }

    /**
     * Busca un administrador por su identificador único.
     * 
     * @param id - ID del administrador.
     * @returns El administrador correspondiente.
     * @throws NotFoundException - Si no se encuentra el administrador.
     */
    async findOne(id: number): Promise<Administrador> {
        const admin = await this.adminRepository.findOne({ where: { adm_id: id } });
        if (!admin) throw new NotFoundException(`Administrador con ID ${id} no encontrado`);
        return this.sanitizeAdmin(admin);
    }

    /**
     * Actualiza los datos de un administrador existente.
     * 
     * @param id - ID del administrador a actualizar.
     * @param dto - Datos nuevos del administrador.
     * @returns El administrador actualizado (sin contraseña).
     * @throws NotFoundException - Si el administrador no existe.
     */
    async update(id: number, dto: UpdateAdministradorDto): Promise<Administrador> {
        const admin = await this.findOne(id);

        if (dto.adm_contrasena) {
            dto.adm_contrasena = await argon2.hash(dto.adm_contrasena);
        }

        Object.assign(admin, dto);
        const updated = await this.adminRepository.save(admin);
        return this.sanitizeAdmin(updated);
    }

    /**
     * Elimina un administrador de la base de datos.
     * 
     * @param id - ID del administrador a eliminar.
     * @throws NotFoundException - Si el administrador no existe.
     */
    async remove(id: number): Promise<void> {
        const admin = await this.findOne(id);
        await this.adminRepository.remove(admin);
    }

    /**
     * Verifica si la contraseña proporcionada coincide con la almacenada.
     * 
     * @param adm_correo - Correo del administrador.
     * @param contrasena - Contraseña en texto plano.
     * @returns `true` si la contraseña es correcta, `false` en caso contrario.
     */
    async verificarContrasena(adm_correo: string, contrasena: string): Promise<boolean> {
        const admin = await this.adminRepository.findOne({ where: { adm_correo } });
        if (!admin?.adm_contrasena) return false;
        return await argon2.verify(admin.adm_contrasena, contrasena);
    }

    /**
     * Sanitiza un objeto de administrador eliminando la contraseña
     * antes de devolverlo en la respuesta.
     * 
     * @param admin - Objeto administrador a sanitizar.
     * @returns Administrador sin el campo de contraseña.
     */
    private sanitizeAdmin(admin: Administrador): Administrador {
        const { adm_contrasena, ...safeData } = admin;
        return safeData as Administrador;
    }
}
