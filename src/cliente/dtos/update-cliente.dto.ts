/**
 * DTO (Data Transfer Object) para la actualización de un cliente existente.
 * 
 * Extiende del DTO de creación mediante `PartialType`, lo que convierte
 * todas sus propiedades en opcionales. Permite actualizaciones parciales.
 */

import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
    /** Contraseña nueva del cliente (opcional, se cifrará antes de guardar) */
    @IsOptional()
    @IsString()
    @Length(6, 100)
    cli_contrasena?: string;
}
