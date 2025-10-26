/**
 * Módulo raíz de la aplicación NestJS.
 * 
 * Configura la carga de variables de entorno, la conexión con la base de datos
 * y la importación de todos los módulos funcionales del sistema.
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';

// Controladores y servicios globales
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Módulos de la aplicación
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
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    /**
     * Configuración global del archivo `.env`.
     * 
     * Se usa `Joi` para validar las variables de entorno críticas antes
     * de iniciar la aplicación.
     */
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().allow(''),
        DB_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().default('1h'),
      }),
    }),

    /**
     * Conexión con la base de datos PostgreSQL mediante TypeORM.
     * 
     * `autoLoadEntities` carga todas las entidades registradas en los módulos.
     */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // Sincroniza el esquema de la base de datos (no usar en producción)
      logging: true,
    }),

    // Módulos del dominio de la aplicación
    AdministradorModule,
    AuthModule,
    TiendaModule,
    ProveedorModule,
    ProductoModule,
    InventarioModule,
    DetalleFacturaModule,
    VentaModule,
    EmpleadoModule,
    ClienteModule,
    MascotaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
