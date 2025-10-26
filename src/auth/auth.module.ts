/**
 * Módulo de autenticación del sistema.
 * 
 * Este módulo agrupa todos los componentes relacionados con el proceso
 * de autenticación, autorización y generación de tokens JWT.
 * 
 * Incluye:
 * - Controlador (`AuthController`)
 * - Servicio (`AuthService`)
 * - Estrategia JWT (`JwtStrategy`)
 * 
 * Importa los módulos de `Administrador`, `Cliente` y `Empleado` para
 * permitir la validación cruzada de usuarios durante el login.
 */

import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

import { AdministradorModule } from '../administrador/administrador.module';
import { ClienteModule } from '../cliente/cliente.module';
import { EmpleadoModule } from '../empleado/empleado.module';

@Module({
    imports: [
        PassportModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) =>
                ({
                    secret: config.get<string>('JWT_SECRET'),
                    signOptions: {
                        expiresIn: config.get<string>('JWT_EXPIRES_IN', '1h'),
                    },
                } as JwtModuleOptions),
        }),
        AdministradorModule,
        ClienteModule,
        EmpleadoModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
