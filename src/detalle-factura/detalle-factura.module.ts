/**
 * Módulo DetalleFactura.
 * 
 * Gestiona la persistencia, controladores y servicios asociados
 * a los detalles de las facturas. Cada detalle representa un producto
 * incluido en una venta específica.
 */

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleFactura } from './entities/detalle-factura.entity';
import { DetalleFacturaService } from './detalle-factura.service';
import { DetalleFacturaController } from './detalle-factura.controller';
import { Producto } from '../producto/entities/producto.entity';
import { VentaModule } from '../venta/venta.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleFactura, Producto]),
    forwardRef(() => VentaModule), // Permite acceder a métodos del módulo Venta
  ],
  controllers: [DetalleFacturaController],
  providers: [DetalleFacturaService],
  exports: [DetalleFacturaService],
})
export class DetalleFacturaModule {}
