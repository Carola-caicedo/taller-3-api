/**
 * DTO (Data Transfer Object) para actualizar los datos de un empleado.
 * 
 * Extiende de `CreateEmpleadoDto` y convierte sus propiedades en opcionales.
 * 
 * Permite actualizaciones parciales y controladas.
 */

import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpleadoDto } from './create-empleado.dto';
import { IsOptional, IsString, IsInt, MinLength } from 'class-validator';

export class UpdateEmpleadoDto extends PartialType(CreateEmpleadoDto) {
    /** ID del empleado (solo para referencias internas, no se modifica directamente) */
    @IsOptional()
    @IsInt()
    emp_id?: number;

    /**
     * Nueva contraseña del empleado.
     * 
     * Si se envía, será cifrada antes de almacenarse.
     */
    @IsOptional()
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
    emp_contrasena?: string;
}
