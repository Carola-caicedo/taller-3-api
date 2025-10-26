/**
 * DTO (Data Transfer Object) para crear un nuevo registro de inventario.
 * 
 * Define los campos necesarios y sus validaciones antes de insertarse en la base de datos.
 */

import { IsInt, IsNumber, Min, IsOptional, IsBoolean } from 'class-validator';

export class CreateInventarioDto {
    /** Cantidad de unidades disponibles */
    @IsInt()
    @Min(0, { message: 'La cantidad no puede ser negativa.' })
    inv_cantidad: number;

    /** Costo unitario del producto */
    @IsNumber()
    @Min(0, { message: 'El costo unitario no puede ser negativo.' })
    inv_costo_unitario: number;

    /** Identificador del producto relacionado */
    @IsInt({ message: 'El ID del producto debe ser un número entero.' })
    prod_id: number;

    /** Identificador de la tienda donde se almacena el producto */
    @IsInt({ message: 'El ID de la tienda debe ser un número entero.' })
    tienda_id: number;

    /** Estado del inventario (activo/inactivo) */
    @IsOptional()
    @IsBoolean()
    inv_activo?: boolean;
}
