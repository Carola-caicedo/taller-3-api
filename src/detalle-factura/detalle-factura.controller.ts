/**
 * Controlador del módulo DetalleFactura.
 * 
 * Define los endpoints para realizar operaciones CRUD sobre
 * los detalles de facturas (líneas de productos dentro de una venta).
 * 
 * Algunas operaciones requieren autenticación mediante JWT.
 */

import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { DetalleFacturaService } from './detalle-factura.service';
import { CreateDetalleFacturaDto } from './dtos/create-detalle-factura.dto';
import { UpdateDetalleFacturaDto } from './dtos/update-detalle-factura.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('detalle-factura')
export class DetalleFacturaController {
    constructor(private readonly detalleService: DetalleFacturaService) {}

    /**
     * Crea un nuevo detalle de factura.
     * 
     * @param dto - Datos del detalle de factura.
     * @returns Detalle de factura creado.
     */
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateDetalleFacturaDto) {
        return this.detalleService.create(dto);
    }

    /**
     * Obtiene la lista completa de detalles de factura.
     * 
     * @returns Arreglo con todos los detalles registrados.
     */
    @Get()
    findAll() {
        return this.detalleService.findAll();
    }

    /**
     * Busca un detalle de factura por su identificador único.
     * 
     * @param id - ID del detalle.
     * @returns Detalle encontrado.
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.detalleService.findOne(id);
    }

    /**
     * Actualiza los datos de un detalle de factura existente.
     * 
     * @param id - ID del detalle a actualizar.
     * @param dto - Nuevos datos a modificar.
     * @returns Detalle actualizado.
     */
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDetalleFacturaDto) {
        return this.detalleService.update(id, dto);
    }

    /**
     * Elimina un detalle de factura por su ID.
     * 
     * @param id - ID del detalle a eliminar.
     */
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.detalleService.remove(id);
    }
}
