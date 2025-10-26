/**
 * Módulo Producto.
 * 
 * Se encarga de gestionar la configuración, controladores y servicios
 * relacionados con los productos del sistema.
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Proveedor } from '../proveedor/entities/proveedor.entity';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, Proveedor])],
  controllers: [ProductoController],
  providers: [ProductoService],
  exports: [ProductoService],
})
export class ProductoModule {}
