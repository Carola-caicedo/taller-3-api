/**
 * DTO (Data Transfer Object) para crear un nuevo empleado.
 * 
 * Valida los datos recibidos antes de crear un registro en la base de datos.
 * 
 * Los decoradores de `class-validator` garantizan que los datos tengan el formato correcto.
 */

import {
    IsString,
    IsEmail,
    IsOptional,
    IsBoolean,
    Length,
    IsInt,
    MinLength,
} from 'class-validator';

export class CreateEmpleadoDto {
    /** Nombre completo del empleado */
    @IsString()
    @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres.' })
    emp_nombre: string;

    /** Correo electrónico único del empleado */
    @IsEmail({}, { message: 'Debe ser un correo electrónico válido.' })
    emp_email: string;

    /**
     * Contraseña del empleado.
     * 
     * Se cifrará antes de guardarse en la base de datos.
     */
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
    emp_contrasena: string;

    /** Cargo o puesto laboral del empleado */
    @IsString()
    @Length(3, 50, { message: 'El cargo debe tener entre 3 y 50 caracteres.' })
    emp_cargo: string;

    /** Estado activo/inactivo del empleado (por defecto activo) */
    @IsOptional()
    @IsBoolean()
    emp_activo?: boolean;

    /** Identificador de la tienda a la que pertenece el empleado */
    @IsOptional()
    @IsInt({ message: 'El ID de tienda debe ser un número entero.' })
    tienda_id?: number;
}
