/**
 * Controlador que expone los endpoints REST del módulo Proveedor.
 * 
 * Permite crear, listar, actualizar y eliminar proveedores del sistema.
 * Algunas rutas requieren autenticación mediante JWT.
 */

import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { CreateProveedorDto } from './dtos/create-proveedor.dto';
import { UpdateProveedorDto } from './dtos/update-proveedor.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('proveedor')
export class ProveedorController {
    constructor(private readonly proveedorService: ProveedorService) {}

    /**
     * Crea un nuevo proveedor.
     * 
     * @param dto - Datos del proveedor a registrar.
     * @returns El proveedor creado.
     */
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateProveedorDto) {
        return this.proveedorService.create(dto);
    }

    /**
     * Obtiene la lista completa de proveedores.
     * 
     * @returns Arreglo con todos los proveedores registrados.
     */
    @Get()
    findAll() {
        return this.proveedorService.findAll();
    }

    /**
     * Busca un proveedor por su identificador único.
     * 
     * @param id - ID del proveedor a consultar.
     * @returns El proveedor encontrado.
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.proveedorService.findOne(id);
    }

    /**
     * Actualiza los datos de un proveedor existente.
     * 
     * @param id - ID del proveedor a actualizar.
     * @param dto - Nuevos datos del proveedor.
     * @returns El proveedor actualizado.
     */
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProveedorDto) {
        return this.proveedorService.update(id, dto);
    }

    /**
     * Elimina un proveedor del sistema.
     * 
     * @param id - ID del proveedor a eliminar.
     */
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.proveedorService.remove(id);
    }
}
