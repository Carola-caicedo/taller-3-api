/**
 * DTO (Data Transfer Object) para crear un nuevo detalle de factura.
 * 
 * Valida los campos obligatorios antes de la inserción.
 */

import { IsInt, IsNumber, Min } from 'class-validator';

export class CreateDetalleFacturaDto {
    /** ID de la venta a la que pertenece este detalle */
    @IsInt({ message: 'El campo venta_id debe ser un número entero válido.' })
    venta_id: number;

    /** ID del producto asociado a este detalle */
    @IsInt({ message: 'El campo producto_id debe ser un número entero válido.' })
    producto_id: number;

    /** Cantidad de productos vendidos */
    @IsInt({ message: 'La cantidad debe ser un número entero.' })
    @Min(1, { message: 'La cantidad mínima es 1.' })
    det_cantidad: number;

    /** Precio unitario del producto */
    @IsNumber({}, { message: 'El precio unitario debe ser un número.' })
    @Min(0, { message: 'El precio unitario no puede ser negativo.' })
    det_precio_unitario: number;
}
