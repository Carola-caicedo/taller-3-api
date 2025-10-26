/**
 * Controlador del módulo Producto.
 * 
 * Expone los endpoints HTTP para realizar operaciones CRUD
 * sobre los productos registrados en el sistema.
 * 
 * Algunas operaciones requieren autenticación mediante JWT.
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
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dtos/create-producto.dto';
import { UpdateProductoDto } from './dtos/update-producto.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('producto')
export class ProductoController {
    constructor(private readonly productoService: ProductoService) {}

    /**
     * Crea un nuevo producto.
     * 
     * @param dto - Datos del producto a registrar.
     * @returns El producto creado.
     */
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateProductoDto) {
        return this.productoService.create(dto);
    }

    /**
     * Obtiene la lista completa de productos.
     * 
     * @returns Arreglo de productos registrados.
     */
    @Get()
    findAll() {
        return this.productoService.findAll();
    }

    /**
     * Busca un producto por su identificador único.
     * 
     * @param id - ID del producto a buscar.
     * @returns El producto correspondiente.
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productoService.findOne(id);
    }

    /**
     * Actualiza los datos de un producto existente.
     * 
     * @param id - ID del producto a actualizar.
     * @param dto - Datos actualizados del producto.
     * @returns El producto actualizado.
     */
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductoDto) {
        return this.productoService.update(id, dto);
    }

    /**
     * Elimina un producto del sistema.
     * 
     * @param id - ID del producto a eliminar.
     */
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.productoService.remove(id);
    }
}
