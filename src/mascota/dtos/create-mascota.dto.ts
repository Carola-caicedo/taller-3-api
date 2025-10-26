/**
 * DTO (Data Transfer Object) para crear una nueva mascota.
 * 
 * Valida los datos recibidos antes de procesarlos en el servicio.
 */

import { IsString, IsNumber, IsOptional, IsInt, Min, MaxLength } from 'class-validator';

export class CreateMascotaDto {
    /** Nombre de la mascota */
    @IsString()
    @MaxLength(100)
    mascota_nombre: string;

    /** Especie de la mascota (Ej: Perro, Gato, Ave, etc.) */
    @IsString()
    @MaxLength(50)
    mascota_especie: string;

    /** Raza de la mascota (opcional) */
    @IsString()
    @MaxLength(50)
    @IsOptional()
    mascota_raza?: string;

    /** Edad de la mascota en años (opcional) */
    @IsNumber()
    @IsInt()
    @Min(0)
    @IsOptional()
    mascota_edad?: number;

    /** ID del cliente dueño de la mascota */
    @IsInt()
    cli_id: number;
}
