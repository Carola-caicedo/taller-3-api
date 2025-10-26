/**
 * Módulo de Mascotas.
 * 
 * Gestiona la lógica y las rutas relacionadas con las mascotas,
 * integrando el controlador, el servicio y las entidades correspondientes.
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MascotaController } from './mascota.controller';
import { MascotaService } from './mascota.service';
import { Mascota } from './entities/mascota.entity';
import { Cliente } from '../cliente/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mascota, Cliente])],
  controllers: [MascotaController],
  providers: [MascotaService],
  exports: [MascotaService],
})
export class MascotaModule {}
