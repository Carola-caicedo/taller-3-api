/**
 * Servicio que maneja la lógica de negocio del módulo de Inventario.
 * 
 * Controla las operaciones CRUD, validación de existencia de productos
 * y tiendas, y mantiene la consistencia de los datos en cada cambio.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventario } from './entities/inventario.entity';
import { Producto } from '../producto/entities/producto.entity';
import { Tienda } from '../tienda/entities/tienda.entity';
import { CreateInventarioDto } from './dtos/create-inventario.dto';
import { UpdateInventarioDto } from './dtos/update-inventario.dto';

@Injectable()
export class InventarioService {
    constructor(
        @InjectRepository(Inventario)
        private readonly inventarioRepo: Repository<Inventario>,

        @InjectRepository(Producto)
        private readonly productoRepo: Repository<Producto>,

        @InjectRepository(Tienda)
        private readonly tiendaRepo: Repository<Tienda>,
    ) {}

    /**
     * Crea un nuevo registro de inventario.
     * 
     * @param dto - Datos del nuevo inventario.
     * @returns Inventario creado.
     * @throws NotFoundException - Si el producto o la tienda no existen.
     */
    async create(dto: CreateInventarioDto): Promise<Inventario> {
        const producto = await this.productoRepo.findOne({ where: { prod_id: dto.prod_id } });
        if (!producto) throw new NotFoundException('Producto no encontrado');

        const tienda = await this.tiendaRepo.findOne({ where: { tienda_id: dto.tienda_id } });
        if (!tienda) throw new NotFoundException('Tienda no encontrada');

        const nuevo = this.inventarioRepo.create({
            ...dto,
            producto,
            tienda,
        });

        return await this.inventarioRepo.save(nuevo);
    }

    /**
     * Obtiene todos los registros de inventario.
     * 
     * @returns Lista de inventarios con sus relaciones.
     */
    async findAll(): Promise<Inventario[]> {
        return await this.inventarioRepo.find({
            relations: ['producto', 'tienda'],
        });
    }

    /**
     * Busca un registro de inventario por su ID.
     * 
     * @param id - Identificador del inventario.
     * @returns Inventario encontrado.
     * @throws NotFoundException - Si no existe el registro.
     */
    async findOne(id: number): Promise<Inventario> {
        const inventario = await this.inventarioRepo.findOne({
            where: { inv_id: id },
            relations: ['producto', 'tienda'],
        });
        if (!inventario) throw new NotFoundException(`Inventario con ID ${id} no encontrado`);
        return inventario;
    }

    /**
     * Actualiza un inventario existente.
     * 
     * @param id - ID del inventario.
     * @param dto - Datos actualizados.
     * @returns Inventario actualizado.
     */
    async update(id: number, dto: UpdateInventarioDto): Promise<Inventario> {
        const inventario = await this.findOne(id);

        if (dto.prod_id) {
            const producto = await this.productoRepo.findOne({ where: { prod_id: dto.prod_id } });
            if (!producto) throw new NotFoundException('Producto no encontrado');
            inventario.producto = producto;
        }

        if (dto.tienda_id) {
            const tienda = await this.tiendaRepo.findOne({ where: { tienda_id: dto.tienda_id } });
            if (!tienda) throw new NotFoundException('Tienda no encontrada');
            inventario.tienda = tienda;
        }

        Object.assign(inventario, dto);
        return await this.inventarioRepo.save(inventario);
    }

    /**
     * Elimina un registro de inventario.
     * 
     * @param id - Identificador del inventario a eliminar.
     */
    async remove(id: number): Promise<void> {
        const inventario = await this.findOne(id);
        await this.inventarioRepo.remove(inventario);
    }
}
