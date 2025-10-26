/**
 * Servicio que contiene la lógica de negocio para la gestión de ventas.
 * 
 * Controla la creación, actualización, eliminación y recalculo de totales
 * a partir de los detalles de cada venta.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from './entities/venta.entity';
import { CreateVentaDto } from './dtos/create-venta.dto';
import { UpdateVentaDto } from './dtos/update-venta.dto';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Empleado } from '../empleado/entities/empleado.entity';
import { Tienda } from '../tienda/entities/tienda.entity';
import { DetalleFactura } from '../detalle-factura/entities/detalle-factura.entity';

@Injectable()
export class VentaService {
    constructor(
        @InjectRepository(Venta)
        private readonly ventaRepo: Repository<Venta>,

        @InjectRepository(Cliente)
        private readonly clienteRepo: Repository<Cliente>,

        @InjectRepository(Empleado)
        private readonly empleadoRepo: Repository<Empleado>,

        @InjectRepository(Tienda)
        private readonly tiendaRepo: Repository<Tienda>,

        @InjectRepository(DetalleFactura)
        private readonly detalleRepo: Repository<DetalleFactura>,
    ) {}

    /**
     * Crea una nueva venta.
     * 
     * @param dto - Datos necesarios para la creación de la venta.
     * @returns Venta creada y almacenada en base de datos.
     */
    async create(dto: CreateVentaDto): Promise<Venta> {
        const cliente = await this.clienteRepo.findOne({ where: { cli_id: dto.cli_id } });
        if (!cliente) throw new NotFoundException('Cliente no encontrado');

        const empleado = await this.empleadoRepo.findOne({ where: { emp_id: dto.emp_id } });
        if (!empleado) throw new NotFoundException('Empleado no encontrado');

        const tienda = await this.tiendaRepo.findOne({ where: { tienda_id: dto.tienda_id } });
        if (!tienda) throw new NotFoundException('Tienda no encontrada');

        const venta = this.ventaRepo.create({
            venta_fecha: new Date(),
            venta_total: 0,
            cliente,
            empleado,
            tienda,
            venta_activa: dto.venta_activa ?? true,
        });

        return await this.ventaRepo.save(venta);
    }

    /** Retorna todas las ventas registradas con sus relaciones principales. */
    async findAll(): Promise<Venta[]> {
        return await this.ventaRepo.find({
            relations: ['detalles', 'cliente', 'empleado', 'tienda'],
            order: { venta_id: 'DESC' },
        });
    }

    /** Busca una venta por su identificador. */
    async findOne(id: number): Promise<Venta> {
        const venta = await this.ventaRepo.findOne({
            where: { venta_id: id },
            relations: ['detalles', 'cliente', 'empleado', 'tienda'],
        });
        if (!venta) throw new NotFoundException(`Venta con ID ${id} no encontrada`);
        return venta;
    }

    /** Recalcula el total de una venta en base a sus detalles de factura. */
    async recalcularTotal(id: number): Promise<Venta> {
        const venta = await this.findOne(id);
        const detalles = await this.detalleRepo.find({ where: { venta_id: id } });
        venta.venta_total = detalles.reduce((sum, d) => sum + Number(d.det_subtotal), 0);
        return await this.ventaRepo.save(venta);
    }

    /** Actualiza los datos de una venta. */
    async update(id: number, dto: UpdateVentaDto): Promise<Venta> {
        const venta = await this.findOne(id);
        Object.assign(venta, dto);
        return await this.ventaRepo.save(venta);
    }

    /** Elimina una venta del sistema. */
    async remove(id: number): Promise<void> {
        const venta = await this.findOne(id);
        await this.ventaRepo.remove(venta);
    }
}
