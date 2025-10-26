/**
 * Servicio que contiene la lógica de negocio del módulo Proveedor.
 * 
 * Implementa las operaciones CRUD y maneja excepciones si el proveedor no existe.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from './entities/proveedor.entity';
import { CreateProveedorDto } from './dtos/create-proveedor.dto';
import { UpdateProveedorDto } from './dtos/update-proveedor.dto';

@Injectable()
export class ProveedorService {
    constructor(
        @InjectRepository(Proveedor)
        private readonly proveedorRepository: Repository<Proveedor>,
    ) {}

    /**
     * Crea un nuevo proveedor en la base de datos.
     * 
     * @param dto - Datos del nuevo proveedor.
     * @returns El proveedor creado.
     */
    async create(dto: CreateProveedorDto): Promise<Proveedor> {
        const nuevoProveedor = this.proveedorRepository.create(dto);
        return await this.proveedorRepository.save(nuevoProveedor);
    }

    /**
     * Obtiene la lista de todos los proveedores registrados.
     * 
     * @returns Arreglo con proveedores y sus productos asociados.
     */
    async findAll(): Promise<Proveedor[]> {
        return await this.proveedorRepository.find({ relations: ['productos'] });
    }

    /**
     * Busca un proveedor por su identificador único.
     * 
     * @param id - ID del proveedor.
     * @returns Proveedor encontrado.
     * @throws NotFoundException - Si no existe el proveedor.
     */
    async findOne(id: number): Promise<Proveedor> {
        const proveedor = await this.proveedorRepository.findOne({
            where: { prove_id: id },
            relations: ['productos'],
        });

        if (!proveedor) {
            throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
        }
        return proveedor;
    }

    /**
     * Actualiza los datos de un proveedor existente.
     * 
     * @param id - ID del proveedor.
     * @param dto - Nuevos datos a aplicar.
     * @returns Proveedor actualizado.
     */
    async update(id: number, dto: UpdateProveedorDto): Promise<Proveedor> {
        const proveedor = await this.findOne(id);
        Object.assign(proveedor, dto);
        return await this.proveedorRepository.save(proveedor);
    }

    /**
     * Elimina un proveedor de la base de datos.
     * 
     * @param id - ID del proveedor a eliminar.
     */
    async remove(id: number): Promise<void> {
        const proveedor = await this.findOne(id);
        await this.proveedorRepository.remove(proveedor);
    }
}
