/**
 * Módulo del Administrador.
 * 
 * Este módulo agrupa todos los componentes relacionados con la gestión de administradores:
 * - Controlador (`AdministradorController`)
 * - Servicio (`AdministradorService`)
 * - Entidad (`Administrador`)
 * 
 * Además, expone el servicio para que pueda ser utilizado desde otros módulos del sistema.
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrador } from './entities/administrador.entity';
import { AdministradorService } from './administrador.service';
import { AdministradorController } from './administrador.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Administrador])],
    controllers: [AdministradorController],
    providers: [AdministradorService],
    exports: [AdministradorService],
})
export class AdministradorModule {}
