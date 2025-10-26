/**
 * Controlador para la gestión de tiendas.
 * 
 * Expone los endpoints HTTP del módulo Tienda y aplica seguridad mediante JWT y roles.
 * Solo los administradores pueden crear, actualizar o eliminar tiendas.
 * 
 * @module TiendaController
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
    Query,
    UseGuards,
} from '@nestjs/common';
import { TiendaService } from './tienda.service';
import { CreateTiendaDto } from './dtos/create-tienda.dto';
import { UpdateTiendaDto } from './dtos/update-tienda.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('tienda')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TiendaController {
    constructor(private readonly tiendaService: TiendaService) {}

    /**
     * Crea una nueva tienda (solo accesible por administradores).
     * 
     * @param createTiendaDto - Datos de la tienda a crear.
     * @returns La tienda creada.
     */
    @Roles('admin')
    @Post()
    create(@Body() createTiendaDto: CreateTiendaDto) {
        return this.tiendaService.create(createTiendaDto);
    }

    /**
     * Lista todas las tiendas disponibles, con opción de filtrar por estado activo/inactivo.
     * 
     * @param activa - (opcional) Si se envía, filtra tiendas activas o inactivas.
     * @returns Lista de tiendas.
     */
    @Get()
    findAll(@Query('activa') activa?: string) {
        const filterActiva =
            activa === 'true' ? true : activa === 'false' ? false : undefined;
        return this.tiendaService.findAll(filterActiva);
    }

    /**
     * Obtiene la información de una tienda por su ID.
     * 
     * @param id - Identificador único de la tienda.
     * @returns Tienda encontrada.
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.tiendaService.findOne(id);
    }

    /**
     * Obtiene los empleados asociados a una tienda.
     * Solo accesible por administradores o empleados.
     * 
     * @param id - Identificador único de la tienda.
     * @returns Tienda con lista de empleados.
     */
    @Roles('admin', 'empleado')
    @Get(':id/empleados')
    findEmpleados(@Param('id', ParseIntPipe) id: number) {
        return this.tiendaService.findEmpleados(id);
    }

    /**
     * Actualiza la información de una tienda existente.
     * 
     * @param id - ID de la tienda a actualizar.
     * @param dto - Datos actualizados de la tienda.
     * @returns Tienda actualizada.
     */
    @Roles('admin')
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTiendaDto) {
        return this.tiendaService.update(id, dto);
    }

    /**
     * Activa una tienda específica.
     * 
     * @param id - ID de la tienda.
     * @returns Tienda activada.
     */
    @Roles('admin')
    @Patch(':id/activar')
    activate(@Param('id', ParseIntPipe) id: number) {
        return this.tiendaService.updateEstado(id, true);
    }

    /**
     * Desactiva una tienda específica.
     * 
     * @param id - ID de la tienda.
     * @returns Tienda desactivada.
     */
    @Roles('admin')
    @Patch(':id/desactivar')
    deactivate(@Param('id', ParseIntPipe) id: number) {
        return this.tiendaService.updateEstado(id, false);
    }

    /**
     * Elimina una tienda del sistema.
     * 
     * @param id - ID de la tienda a eliminar.
     */
    @Roles('admin')
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.tiendaService.remove(id);
    }
}
