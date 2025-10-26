/**
 * Controlador para la gestión de empleados.
 * 
 * Define los endpoints del módulo Empleado, encargados de crear, listar,
 * actualizar, activar/desactivar y eliminar empleados.
 * 
 * Las rutas están protegidas con JWT y RolesGuard.
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
    Query,
    UseGuards,
} from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from './dtos/create-empleado.dto';
import { UpdateEmpleadoDto } from './dtos/update-empleado.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('empleado')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmpleadoController {
    constructor(private readonly empleadoService: EmpleadoService) {}

    /** Crea un nuevo empleado (solo admin). */
    @Roles('admin')
    @Post()
    create(@Body() dto: CreateEmpleadoDto) {
        return this.empleadoService.create(dto);
    }

    /** Lista todos los empleados, con filtros opcionales (admin o empleado). */
    @Roles('admin', 'empleado')
    @Get()
    findAll(
        @Query('activo') activo?: string,
        @Query('cargo') cargo?: string,
    ) {
        const filters = {
            activo:
                activo === 'true' ? true : activo === 'false' ? false : undefined,
            cargo,
        };
        return this.empleadoService.findAll(filters);
    }

    /** Obtiene un empleado por su ID (admin o empleado). */
    @Roles('admin', 'empleado')
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.empleadoService.findOne(id);
    }

    /** Busca empleados por tienda (admin o empleado). */
    @Roles('admin', 'empleado')
    @Get('tienda/:tiendaId')
    findByTienda(@Param('tiendaId', ParseIntPipe) tiendaId: number) {
        return this.empleadoService.findByTienda(tiendaId);
    }

    /** Busca empleados por cargo (admin o empleado). */
    @Roles('admin', 'empleado')
    @Get('cargo/:cargo')
    findByCargo(@Param('cargo') cargo: string) {
        return this.empleadoService.findByCargo(cargo);
    }

    /** Actualiza los datos de un empleado (solo admin). */
    @Roles('admin')
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateEmpleadoDto,
    ) {
        return this.empleadoService.update(id, dto);
    }

    /** Activa un empleado (solo admin). */
    @Roles('admin')
    @Patch(':id/activar')
    activate(@Param('id', ParseIntPipe) id: number) {
        return this.empleadoService.updateEstado(id, true);
    }

    /** Desactiva un empleado (solo admin). */
    @Roles('admin')
    @Patch(':id/desactivar')
    deactivate(@Param('id', ParseIntPipe) id: number) {
        return this.empleadoService.updateEstado(id, false);
    }

    /** Elimina un empleado (solo admin). */
    @Roles('admin')
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.empleadoService.remove(id);
    }
}
