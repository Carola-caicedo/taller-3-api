/**
 * Servicio que implementa la lógica de negocio para los detalles de factura.
 * 
 * Incluye operaciones CRUD, cálculos de subtotales y actualización
 * del total de la venta asociada. Utiliza los repositorios de TypeORM.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleFactura } from './entities/detalle-factura.entity';
import { CreateDetalleFacturaDto } from './dtos/create-detalle-factura.dto';
import { UpdateDetalleFacturaDto } from './dtos/update-detalle-factura.dto';
import { Producto } from '../producto/entities/producto.entity';
import { VentaService } from '../venta/venta.service';

@Injectable()
export class DetalleFacturaService {
    constructor(
        @InjectRepository(DetalleFactura)
        private readonly detalleRepo: Repository<DetalleFactura>,

        @InjectRepository(Producto)
        private readonly productoRepo: Repository<Producto>,

        private readonly ventaService: VentaService,
    ) {}

    /**
     * Crea un nuevo detalle y recalcula el total de la venta.
     * 
     * @param dto - Datos del detalle de factura.
     * @returns Detalle de factura creado.
     * @throws NotFoundException - Si el producto no existe.
     */
    async create(dto: CreateDetalleFacturaDto): Promise<DetalleFactura> {
        const producto = await this.productoRepo.findOne({ where: { prod_id: dto.producto_id } });
        if (!producto) throw new NotFoundException('Producto no encontrado');

        const subtotal = dto.det_cantidad * dto.det_precio_unitario;

        const detalle = this.detalleRepo.create({
            ...dto,
            det_subtotal: subtotal,
            producto,
        });

        const saved = await this.detalleRepo.save(detalle);

        await this.ventaService.recalcularTotal(dto.venta_id);

        return saved;
    }

    /**
     * Obtiene todos los detalles registrados.
     * 
     * @returns Arreglo de detalles con sus relaciones.
     */
    async findAll(): Promise<DetalleFactura[]> {
        return await this.detalleRepo.find({ relations: ['venta', 'producto'] });
    }

    /**
     * Busca un detalle por su ID.
     * 
     * @param id - ID del detalle.
     * @returns Detalle encontrado.
     * @throws NotFoundException - Si no existe el detalle.
     */
    async findOne(id: number): Promise<DetalleFactura> {
        const detalle = await this.detalleRepo.findOne({
            where: { det_id: id },
            relations: ['venta', 'producto'],
        });
        if (!detalle) throw new NotFoundException(`Detalle con ID ${id} no encontrado`);
        return detalle;
    }

    /**
     * Actualiza un detalle existente y recalcula el total de la venta.
     * 
     * @param id - ID del detalle a actualizar.
     * @param dto - Datos nuevos a aplicar.
     * @returns Detalle actualizado.
     */
    async update(id: number, dto: UpdateDetalleFacturaDto): Promise<DetalleFactura> {
        const detalle = await this.findOne(id);
        Object.assign(detalle, dto);

        detalle.det_subtotal = detalle.det_cantidad * detalle.det_precio_unitario;
        const updated = await this.detalleRepo.save(detalle);

        await this.ventaService.recalcularTotal(detalle.venta_id);

        return updated;
    }

    /**
     * Elimina un detalle de factura y actualiza el total de la venta.
     * 
     * @param id - ID del detalle a eliminar.
     */
    async remove(id: number): Promise<void> {
        const detalle = await this.findOne(id);
        await this.detalleRepo.remove(detalle);
        await this.ventaService.recalcularTotal(detalle.venta_id);
    }
}
