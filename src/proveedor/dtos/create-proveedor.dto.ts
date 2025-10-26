/**
 * DTO (Data Transfer Object) para crear un nuevo proveedor.
 * 
 * Valida los datos ingresados antes de almacenarlos en la base de datos.
 */

import {
    IsString,
    IsEmail,
    Length,
    IsOptional,
    IsBoolean,
    MaxLength,
} from 'class-validator';

export class CreateProveedorDto {
    /** Nombre completo o razón social del proveedor */
    @IsString()
    @Length(3, 100)
    prove_nombre: string;

    /** Correo electrónico del proveedor */
    @IsEmail()
    @MaxLength(100)
    prove_email: string;

    /** Teléfono de contacto */
    @IsString()
    @Length(7, 15)
    prove_telefono: string;

    /** Dirección física del proveedor */
    @IsString()
    @Length(5, 200)
    prove_direccion: string;

    /** RUC o NIT del proveedor */
    @IsString()
    @Length(5, 20)
    prove_ruc: string;

    /** Estado activo/inactivo (opcional) */
    @IsOptional()
    @IsBoolean()
    prove_activo?: boolean;
}
