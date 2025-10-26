/**
 * Módulo que agrupa toda la funcionalidad relacionada con los proveedores.
 * 
 * Integra el controlador, el servicio y la entidad correspondiente.
 * Además importa el módulo de autenticación para usar los guards JWT.
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from './entities/proveedor.entity';
import { ProveedorService } from './proveedor.service';
import { ProveedorController } from './proveedor.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proveedor]),
    AuthModule, // Permite usar JwtAuthGuard
  ],
  controllers: [ProveedorController],
  providers: [ProveedorService],
  exports: [ProveedorService],
})
export class ProveedorModule {}
