/**
 * DTO (Data Transfer Object) para crear un nuevo producto.
 * 
 * Valida los campos antes de almacenar el producto en la base de datos.
 */

import {
    IsString,
    IsNumber,
    Min,
    IsOptional,
    IsBoolean,
    IsInt,
} from 'class-validator';

export class CreateProductoDto {
    /** Nombre del producto */
    @IsString()
    prod_nombre: string;

    /** Descripción del producto (opcional) */
    @IsString()
    @IsOptional()
    prod_descripcion?: string;

    /** Precio unitario del producto */
    @IsNumber()
    @Min(0)
    prod_precio: number;

    /** Cantidad disponible en stock */
    @IsInt()
    @Min(0)
    prod_stock: number;

    /** Estado del producto (activo/inactivo) */
    @IsBoolean()
    @IsOptional()
    prod_activo?: boolean;

    /** ID del proveedor asociado (opcional) */
    @IsOptional()
    @IsInt()
    prove_id?: number;
}
