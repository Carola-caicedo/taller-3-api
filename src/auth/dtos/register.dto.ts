/**
 * DTO (Data Transfer Object) para el registro de nuevos clientes.
 * 
 * Valida los datos de registro enviados desde el frontend antes
 * de que sean procesados por el backend.
 * 
 * Nota: los administradores se crean internamente desde el panel.
 */

import { IsString, IsEmail, MinLength, Length, IsOptional } from 'class-validator';

export class RegisterDto {
  /** Nombre completo del cliente */
  @IsString()
  @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' })
  nombre: string;

  /** Correo electrónico del cliente */
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  correo: string;

  /** Contraseña del cliente */
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  contrasena: string;

  /** Teléfono del cliente */
  @IsString()
  @Length(7, 15, { message: 'El teléfono debe tener entre 7 y 15 caracteres' })
  telefono: string;

  /** Dirección del cliente */
  @IsString()
  @Length(5, 200, { message: 'La dirección debe tener entre 5 y 200 caracteres' })
  direccion: string;

  /** Rol opcional, reservado para futuras expansiones del sistema */
  @IsOptional()
  @IsString()
  rol?: string;
}
