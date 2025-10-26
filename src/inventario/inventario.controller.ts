/**
 * Controlador para gestionar el inventario de productos en las tiendas.
 * 
 * Define los endpoints del módulo Inventario y las operaciones CRUD
 * sobre los registros de stock por producto y tienda.
 * 
 * Algunas rutas están protegidas mediante autenticación JWT.
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
import { InventarioService } from './inventario.service';
import { CreateInventarioDto } from './dtos/create-inventario.dto';
import { UpdateInventarioDto } from './dtos/update-inventario.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('inventario')
export class InventarioController {
    constructor(private readonly inventarioService: InventarioService) {}

    /**
     * Crea un nuevo registro de inventario.
     * 
     * @param dto - Datos del nuevo inventario.
     * @returns Inventario creado.
     */
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateInventarioDto) {
        return this.inventarioService.create(dto);
    }

    /**
     * Obtiene todos los registros de inventario.
     * 
     * @returns Lista de inventarios con relaciones de producto y tienda.
     */
    @Get()
    findAll() {
        return this.inventarioService.findAll();
    }

    /**
     * Busca un inventario por su identificador único.
     * 
     * @param id - ID del registro de inventario.
     * @returns Inventario correspondiente.
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.inventarioService.findOne(id);
    }

    /**
     * Actualiza un registro de inventario existente.
     * 
     * @param id - ID del inventario a actualizar.
     * @param dto - Datos nuevos a modificar.
     * @returns Inventario actualizado.
     */
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateInventarioDto) {
        return this.inventarioService.update(id, dto);
    }

    /**
     * Elimina un registro de inventario.
     * 
     * @param id - ID del inventario a eliminar.
     */
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.inventarioService.remove(id);
    }
}
