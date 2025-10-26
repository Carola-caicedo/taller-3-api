/**
 * Controlador que gestiona las rutas y operaciones del módulo de Administrador.
 * 
 * Este controlador define los endpoints para crear, leer, actualizar y eliminar
 * administradores dentro del sistema. 
 * 
 * Todas las rutas están protegidas mediante autenticación JWT y verificación de roles.
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
import { AdministradorService } from './administrador.service';
import { CreateAdministradorDto } from './dtos/create-administrador.dto';
import { UpdateAdministradorDto } from './dtos/update-administrador.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('administrador')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdministradorController {
    constructor(private readonly administradorService: AdministradorService) {}

    /**
     * Crea un nuevo administrador en el sistema.
     * 
     * @param dto - Objeto con los datos del nuevo administrador.
     * @returns El administrador recién creado.
     */
    @Post()
    @Roles('admin')
    create(@Body() dto: CreateAdministradorDto) {
        return this.administradorService.create(dto);
    }

    /**
     * Obtiene la lista completa de administradores registrados.
     * 
     * @returns Arreglo con todos los administradores.
     */
    @Get()
    @Roles('admin')
    findAll() {
        return this.administradorService.findAll();
    }

    /**
     * Busca un administrador por su identificador único.
     * 
     * @param id - Identificador del administrador.
     * @returns El administrador encontrado.
     * @throws NotFoundException - Si no se encuentra el administrador.
     */
    @Get(':id')
    @Roles('admin')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.administradorService.findOne(id);
    }

    /**
     * Actualiza los datos de un administrador existente.
     * 
     * @param id - Identificador del administrador a actualizar.
     * @param dto - Datos nuevos del administrador.
     * @returns El administrador actualizado.
     * @throws NotFoundException - Si no se encuentra el administrador.
     */
    @Patch(':id')
    @Roles('admin')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateAdministradorDto,
    ) {
        return this.administradorService.update(id, dto);
    }

    /**
     * Elimina un administrador del sistema.
     * 
     * @param id - Identificador del administrador a eliminar.
     * @returns Confirmación de eliminación.
     * @throws NotFoundException - Si no se encuentra el administrador.
     */
    @Delete(':id')
    @Roles('admin')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.administradorService.remove(id);
    }

    /**
     * Endpoint de prueba que muestra un mensaje de bienvenida.
     * Solo accesible para usuarios con rol de administrador.
     * 
     * @returns Mensaje de bienvenida.
     */
    @Get('panel')
    @Roles('admin')
    getPanel() {
        return { message: 'Bienvenido al panel de administración' };
    }
}
