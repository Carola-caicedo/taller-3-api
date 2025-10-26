/**
 * Controlador que maneja las rutas y operaciones del módulo de Clientes.
 * 
 * Define los endpoints públicos y protegidos relacionados con la gestión
 * de clientes dentro del sistema. Algunas operaciones requieren autenticación JWT.
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
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dtos/create-cliente.dto';
import { UpdateClienteDto } from './dtos/update-cliente.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('cliente')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) {}

    /**
     * Crea un nuevo cliente en el sistema.
     * 
     * @param dto - Datos del nuevo cliente.
     * @returns Cliente creado.
     */
    @Post()
    create(@Body() dto: CreateClienteDto) {
        return this.clienteService.create(dto);
    }

    /**
     * Obtiene la lista de todos los clientes registrados.
     * 
     * Solo accesible por usuarios con rol de administrador.
     * 
     * @returns Arreglo con los clientes.
     */
    @Get()
    @Roles('admin')
    findAll() {
        return this.clienteService.findAll();
    }

    /**
     * Busca un cliente por su identificador único.
     * 
     * @param id - ID del cliente.
     * @returns Cliente encontrado.
     */
    @Get(':id')
    @Roles('cliente', 'admin')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.clienteService.findOne(id);
    }

    /**
     * Actualiza los datos de un cliente existente.
     * 
     * @param id - ID del cliente a actualizar.
     * @param dto - Datos actualizados.
     * @returns Cliente actualizado.
     */
    @Patch(':id')
    @Roles('cliente', 'admin')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateClienteDto,
    ) {
        return this.clienteService.update(id, dto);
    }

    /**
     * Elimina un cliente del sistema.
     * 
     * @param id - ID del cliente a eliminar.
     * @returns Confirmación de eliminación.
     */
    @Delete(':id')
    @Roles('admin')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.clienteService.remove(id);
    }

    /**
     * Endpoint de ejemplo para mostrar el perfil del cliente autenticado.
     * 
     * Solo accesible para usuarios con rol de cliente.
     * 
     * @returns Mensaje de bienvenida.
     */
    @Get('perfil/me')
    @Roles('cliente')
    getPerfilPropio() {
        return { message: 'Bienvenido a tu cuenta' };
    }
}
