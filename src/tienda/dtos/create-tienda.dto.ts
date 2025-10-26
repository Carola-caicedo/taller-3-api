/**
 * DTO (Data Transfer Object) para crear una nueva tienda.
 * 
 * Contiene las validaciones necesarias para asegurar que
 * los datos ingresados cumplan con los formatos esperados.
 */

import { IsString, Length, IsBoolean, IsOptional } from 'class-validator';

export class CreateTiendaDto {
    /** Nombre comercial de la tienda */
    @IsString()
    @Length(3, 100)
    tienda_nombre: string;

    /** Dirección física de la tienda */
    @IsString()
    @Length(5, 150)
    tienda_direccion: string;

    /** Ciudad donde está ubicada la tienda */
    @IsString()
    @Length(2, 80)
    tienda_ciudad: string;

    /** Teléfono de contacto */
    @IsString()
    @Length(5, 20)
    tienda_telefono: string;

    /** Estado inicial de la tienda (opcional) */
    @IsOptional()
    @IsBoolean()
    tienda_activa?: boolean;
}
