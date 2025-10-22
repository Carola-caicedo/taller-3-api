import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdministradorModule } from './administrador/administrador.module';
import { TiendaModule } from './tienda/tienda.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { ProductoModule } from './producto/producto.module';
import { InventarioModule } from './inventario/inventario.module';
import { DetalleFacturaModule } from './detalle-factura/detalle-factura.module';
import { VentaModule } from './venta/venta.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { ClienteModule } from './cliente/cliente.module';
import { MascotaModule } from './mascota/mascota.module';
import { AdministradorController } from './administrador/administrador.controller';
import { AdministradorService } from './administrador/administrador.service';
import { AdministradorModule } from './administrador/administrador.module';

@Module({
  imports: [AdministradorModule, TiendaModule, ProveedorModule, ProductoModule, InventarioModule, DetalleFacturaModule, VentaModule, EmpleadoModule, ClienteModule, MascotaModule],
  controllers: [AppController, AdministradorController],
  providers: [AppService, AdministradorService],
})
export class AppModule {}
