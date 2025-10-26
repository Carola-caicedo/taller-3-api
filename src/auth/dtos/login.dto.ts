/**
 * DTO (Data Transfer Object) para el inicio de sesión.
 * 
 * Se encarga de validar los datos enviados por el cliente
 * antes de ser procesados por el servicio de autenticación.
 */

import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
    /** Correo electrónico del usuario */
    @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
    correo: string;

    /** Contraseña en texto plano */
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    contrasena: string;
}
