/**
 * Servicio que implementa la lógica de negocio del módulo Producto.
 * 
 * Incluye las operaciones CRUD y la gestión de relaciones con el proveedor.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { Proveedor } from '../proveedor/entities/proveedor.entity';
import { CreateProductoDto } from './dtos/create-producto.dto';
import { UpdateProductoDto } from './dtos/update-producto.dto';

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(Producto)
        private readonly productoRepo: Repository<Producto>,

        @InjectRepository(Proveedor)
        private readonly proveedorRepo: Repository<Proveedor>,
    ) {}

    /**
     * Crea un nuevo producto, asociándolo a un proveedor si se especifica.
     * 
     * @param dto - Datos del nuevo producto.
     * @returns Producto creado.
     * @throws NotFoundException - Si el proveedor no existe.
     */
    async create(dto: CreateProductoDto): Promise<Producto> {
        const producto = this.productoRepo.create(dto);

        if (dto.prove_id) {
            const proveedor = await this.proveedorRepo.findOne({ where: { prove_id: dto.prove_id } });
            if (!proveedor) throw new NotFoundException('Proveedor no encontrado');
            producto.proveedor = proveedor;
        }

        return await this.productoRepo.save(producto);
    }

    /**
     * Obtiene todos los productos registrados con su proveedor asociado.
     * 
     * @returns Lista de productos.
     */
    async findAll(): Promise<Producto[]> {
        return await this.productoRepo.find({ relations: ['proveedor'] });
    }

    /**
     * Busca un producto por su identificador único.
     * 
     * @param id - ID del producto.
     * @returns Producto encontrado.
     * @throws NotFoundException - Si el producto no existe.
     */
    async findOne(id: number): Promise<Producto> {
        const producto = await this.productoRepo.findOne({
            where: { prod_id: id },
            relations: ['proveedor'],
        });
        if (!producto) throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        return producto;
    }

    /**
     * Actualiza los datos de un producto existente.
     * 
     * @param id - ID del producto a actualizar.
     * @param dto - Nuevos valores del producto.
     * @returns Producto actualizado.
     * @throws NotFoundException - Si el proveedor no existe.
     */
    async update(id: number, dto: UpdateProductoDto): Promise<Producto> {
        const producto = await this.findOne(id);
        Object.assign(producto, dto);

        if (dto.prove_id) {
            const proveedor = await this.proveedorRepo.findOne({ where: { prove_id: dto.prove_id } });
            if (!proveedor) throw new NotFoundException('Proveedor no encontrado');
            producto.proveedor = proveedor;
        }

        return await this.productoRepo.save(producto);
    }

    /**
     * Elimina un producto del sistema.
     * 
     * @param id - ID del producto a eliminar.
     */
    async remove(id: number): Promise<void> {
        const producto = await this.findOne(id);
        await this.productoRepo.remove(producto);
    }
}
