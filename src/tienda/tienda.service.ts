/**
 * Servicio que contiene la lógica de negocio para la gestión de tiendas.
 * 
 * Implementa las operaciones CRUD y la consulta de empleados asociados.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tienda } from './entities/tienda.entity';
import { CreateTiendaDto } from './dtos/create-tienda.dto';
import { UpdateTiendaDto } from './dtos/update-tienda.dto';

@Injectable()
export class TiendaService {
    constructor(
        @InjectRepository(Tienda)
        private tiendaRepository: Repository<Tienda>,
    ) {}

    /**
     * Crea una nueva tienda y la guarda en la base de datos.
     * 
     * @param createTiendaDto - Datos de la tienda a crear.
     * @returns Tienda creada.
     */
    async create(createTiendaDto: CreateTiendaDto): Promise<Tienda> {
        const tienda = this.tiendaRepository.create(createTiendaDto);
        return await this.tiendaRepository.save(tienda);
    }

    /**
     * Obtiene la lista de tiendas, con opción de filtrar por estado.
     * 
     * @param activa - Si se define, filtra tiendas activas o inactivas.
     * @returns Lista de tiendas.
     */
    async findAll(activa?: boolean): Promise<Tienda[]> {
        const where = activa !== undefined ? { tienda_activa: activa } : {};
        return await this.tiendaRepository.find({ where });
    }

    /**
     * Busca una tienda por su ID.
     * 
     * @param id - Identificador de la tienda.
     * @returns Tienda encontrada.
     * @throws NotFoundException - Si no existe.
     */
    async findOne(id: number): Promise<Tienda> {
        const tienda = await this.tiendaRepository.findOne({ where: { tienda_id: id } });
        if (!tienda) throw new NotFoundException(`Tienda con ID ${id} no encontrada`);
        return tienda;
    }

    /**
     * Obtiene una tienda junto con sus empleados.
     * 
     * @param id - ID de la tienda.
     * @returns Tienda con relación empleados.
     */
    async findEmpleados(id: number): Promise<Tienda> {
        const tienda = await this.tiendaRepository.findOne({
            where: { tienda_id: id },
            relations: ['empleados'],
        });
        if (!tienda) throw new NotFoundException(`Tienda con ID ${id} no encontrada`);
        return tienda;
    }

    /**
     * Actualiza los datos de una tienda existente.
     * 
     * @param id - ID de la tienda a modificar.
     * @param updateTiendaDto - Nuevos datos de la tienda.
     * @returns Tienda actualizada.
     */
    async update(id: number, updateTiendaDto: UpdateTiendaDto): Promise<Tienda> {
        const tienda = await this.findOne(id);
        Object.assign(tienda, updateTiendaDto);
        return await this.tiendaRepository.save(tienda);
    }

    /**
     * Cambia el estado activo/inactivo de una tienda.
     * 
     * @param id - ID de la tienda.
     * @param activa - Nuevo estado.
     * @returns Tienda con estado actualizado.
     */
    async updateEstado(id: number, activa: boolean): Promise<Tienda> {
        const tienda = await this.findOne(id);
        tienda.tienda_activa = activa;
        return await this.tiendaRepository.save(tienda);
    }

    /**
     * Elimina una tienda de la base de datos.
     * 
     * @param id - ID de la tienda a eliminar.
     */
    async remove(id: number): Promise<void> {
        const tienda = await this.findOne(id);
        await this.tiendaRepository.remove(tienda);
    }
}
