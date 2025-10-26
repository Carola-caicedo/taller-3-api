/**
 * Módulo de Inventario.
 * 
 * Gestiona el stock de productos en tiendas y su relación con
 * las entidades `Producto` y `Tienda`.
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventario } from './entities/inventario.entity';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';
import { Producto } from '../producto/entities/producto.entity';
import { Tienda } from '../tienda/entities/tienda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inventario, Producto, Tienda])],
  controllers: [InventarioController],
  providers: [InventarioService],
  exports: [InventarioService],
})
export class InventarioModule {}
