/**
 * DTO (Data Transfer Object) utilizado para crear un nuevo administrador.
 * 
 * Valida los datos enviados desde el cliente antes de ser procesados por el backend.
 * 
 * Cada propiedad incluye decoradores de `class-validator` que aseguran integridad
 * y consistencia de los datos recibidos.
 */

import {
    IsString,
    IsEmail,
    Length,
    IsBoolean,
    IsOptional,
    Matches,
} from 'class-validator';

export class CreateAdministradorDto {
    /**
     * Nombre completo del administrador.
     * Debe tener entre 3 y 100 caracteres.
     */
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres.' })
    adm_nombre: string;

    /**
     * Nombre de usuario para iniciar sesión.
     * Solo puede contener letras, números o guiones bajos.
     */
    @IsString({ message: 'El usuario debe ser una cadena de texto.' })
    @Length(4, 50, { message: 'El usuario debe tener entre 4 y 50 caracteres.' })
    @Matches(/^[a-zA-Z0-9_]+$/, {
        message: 'El usuario solo puede contener letras, números y guiones bajos.',
    })
    adm_usuario: string;

    /**
     * Contraseña del administrador.
     * Debe contener al menos una mayúscula, un número y un símbolo especial.
     */
    @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
    @Length(6, 100, {
        message: 'La contraseña debe tener entre 6 y 100 caracteres.',
    })
    @Matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,100}$/, {
        message:
            'La contraseña debe tener al menos una mayúscula, un número y un símbolo especial.',
    })
    adm_contrasena: string;

    /** Correo electrónico del administrador (formato válido obligatorio). */
    @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido.' })
    adm_correo: string;

    /** Estado activo/inactivo del administrador (opcional). */
    @IsOptional()
    @IsBoolean({ message: 'El estado activo debe ser un valor booleano.' })
    adm_activo?: boolean;
}
