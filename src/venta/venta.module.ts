/**
 * Módulo de ventas.
 * 
 * Agrupa el controlador, servicio y entidades necesarias para 
 * manejar el flujo de ventas y facturación.
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Empleado } from '../empleado/entities/empleado.entity';
import { Tienda } from '../tienda/entities/tienda.entity';
import { DetalleFactura } from '../detalle-factura/entities/detalle-factura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venta, Cliente, Empleado, Tienda, DetalleFactura])],
  controllers: [VentaController],
  providers: [VentaService],
  exports: [VentaService],
})
export class VentaModule {}
