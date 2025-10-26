/**
 * Módulo de Clientes.
 * 
 * Contiene la configuración principal del módulo, incluyendo:
 * - Controlador (`ClienteController`)
 * - Servicio (`ClienteService`)
 * - Entidad (`Cliente`)
 * 
 * Integra el módulo de autenticación (`AuthModule`) mediante `forwardRef`
 * para evitar dependencias circulares y permitir el acceso mutuo a servicios.
 */

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]),
    forwardRef(() => AuthModule), // Permite relación circular con AuthService
  ],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService], // Exporta el servicio para uso en AuthService
})
export class ClienteModule {}
