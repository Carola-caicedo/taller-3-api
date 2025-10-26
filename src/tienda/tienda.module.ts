/**
 * Módulo que agrupa la configuración, servicios y controladores del dominio Tienda.
 * 
 * Importa la entidad Tienda y expone el servicio para su uso en otros módulos.
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiendaController } from './tienda.controller';
import { TiendaService } from './tienda.service';
import { Tienda } from './entities/tienda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tienda])],
  controllers: [TiendaController],
  providers: [TiendaService],
  exports: [TiendaService],
})
export class TiendaModule {}
