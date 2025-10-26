/**
 * DTO (Data Transfer Object) para la creación de un nuevo cliente.
 * 
 * Valida los datos recibidos antes de ser procesados por el backend
 * mediante decoradores de `class-validator`.
 */

import {
    IsString,
    IsEmail,
    Length,
    IsBoolean,
    IsOptional,
} from 'class-validator';

export class CreateClienteDto {
    /** Nombre completo del cliente */
    @IsString()
    @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres.' })
    cli_nombre: string;

    /** Correo electrónico válido y único */
    @IsEmail({}, { message: 'Debe ser un correo electrónico válido.' })
    cli_correo: string;

    /** Número de teléfono del cliente */
    @IsString()
    @Length(7, 15, { message: 'El teléfono debe tener entre 7 y 15 caracteres.' })
    cli_telefono: string;

    /** Dirección física del cliente */
    @IsString()
    @Length(5, 200, { message: 'La dirección debe tener entre 5 y 200 caracteres.' })
    cli_direccion: string;

    /**
     * Contraseña del cliente (opcional).
     * 
     * Si se proporciona, será cifrada antes de guardarse en la base de datos.
     */
    @IsOptional()
    @IsString()
    @Length(6, 100, { message: 'La contraseña debe tener entre 6 y 100 caracteres.' })
    cli_contrasena?: string;

    /** Estado del cliente (activo/inactivo) */
    @IsOptional()
    @IsBoolean()
    cli_activo?: boolean;
}
