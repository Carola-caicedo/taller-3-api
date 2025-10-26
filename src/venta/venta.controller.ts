/**
 * Controlador del módulo Venta.
 * 
 * Expone los endpoints HTTP que permiten crear, listar, actualizar, 
 * eliminar y recalcular ventas dentro del sistema.
 * Todas las rutas están protegidas con autenticación JWT.
 */

import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { VentaService } from './venta.service';
import { CreateVentaDto } from './dtos/create-venta.dto';
import { UpdateVentaDto } from './dtos/update-venta.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('venta')
export class VentaController {
    constructor(private readonly ventaService: VentaService) {}

    /** Crea una nueva venta */
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateVentaDto) {
        return this.ventaService.create(dto);
    }

    /** Lista todas las ventas registradas */
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.ventaService.findAll();
    }

    /** Obtiene una venta por su ID */
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.ventaService.findOne(id);
    }

    /** Actualiza los datos de una venta existente */
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateVentaDto) {
        return this.ventaService.update(id, dto);
    }

    /** Elimina una venta del sistema */
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.ventaService.remove(id);
    }

    /** Recalcula el total de una venta con base en sus detalles */
    @UseGuards(JwtAuthGuard)
    @Patch(':id/recalcular')
    recalcular(@Param('id', ParseIntPipe) id: number) {
        return this.ventaService.recalcularTotal(id);
    }
}
