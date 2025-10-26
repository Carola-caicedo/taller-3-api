/**
 * Módulo encargado de la gestión de empleados.
 * 
 * Conecta el servicio, el controlador y las dependencias con Tienda, Venta y Auth.
 * Permite el manejo de empleados y su relación con ventas y tiendas.
 */

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpleadoController } from './empleado.controller';
import { EmpleadoService } from './empleado.service';
import { Empleado } from './entities/empleado.entity';
import { Tienda } from '../tienda/entities/tienda.entity';
import { Venta } from '../venta/entities/venta.entity';
import { AuthModule } from '../auth/auth.module';
import { TiendaModule } from '../tienda/tienda.module';
import { VentaModule } from '../venta/venta.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Empleado, Tienda, Venta]),
    forwardRef(() => AuthModule),
    forwardRef(() => TiendaModule),
    forwardRef(() => VentaModule),
  ],
  controllers: [EmpleadoController],
  providers: [EmpleadoService],
  exports: [EmpleadoService],
})
export class EmpleadoModule {}
