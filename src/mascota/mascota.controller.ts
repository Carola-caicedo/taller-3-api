/**
 * Controlador que maneja las operaciones CRUD del módulo Mascota.
 * 
 * Permite crear, listar, actualizar y eliminar mascotas, además de
 * obtener las mascotas asociadas a un cliente específico.
 * 
 * Todas las rutas están protegidas mediante el guard de autenticación JWT.
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
import { MascotaService } from './mascota.service';
import { CreateMascotaDto } from './dtos/create-mascota.dto';
import { UpdateMascotaDto } from './dtos/update-mascota.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('mascota')
@UseGuards(JwtAuthGuard)
export class MascotaController {
    constructor(private readonly mascotaService: MascotaService) {}

    /** Crea una nueva mascota asociada a un cliente. */
    @Post()
    create(@Body() createMascotaDto: CreateMascotaDto) {
        return this.mascotaService.create(createMascotaDto);
    }

    /** Obtiene todas las mascotas registradas en el sistema. */
    @Get()
    findAll() {
        return this.mascotaService.findAll();
    }

    /** Obtiene todas las mascotas que pertenecen a un cliente específico. */
    @Get('cliente/:clienteId')
    findByCliente(@Param('clienteId', ParseIntPipe) clienteId: number) {
        return this.mascotaService.findByCliente(clienteId);
    }

    /** Busca una mascota por su identificador único. */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.mascotaService.findOne(id);
    }

    /** Actualiza los datos de una mascota existente. */
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateMascotaDto: UpdateMascotaDto,
    ) {
        return this.mascotaService.update(id, updateMascotaDto);
    }

    /** Elimina una mascota del sistema. */
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.mascotaService.remove(id);
    }
}
