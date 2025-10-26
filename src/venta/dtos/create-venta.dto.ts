/**
 * DTO para la creación de una venta.
 * 
 * Valida las claves foráneas (cliente, empleado, tienda) y el estado de la venta.
 */

import { IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateVentaDto {
    /** ID del cliente asociado a la venta */
    @IsInt({ message: 'El campo cli_id debe ser un número entero válido.' })
    cli_id: number;

    /** ID del empleado que realiza la venta */
    @IsInt({ message: 'El campo emp_id debe ser un número entero válido.' })
    emp_id: number;

    /** ID de la tienda donde se registra la venta */
    @IsInt({ message: 'El campo tienda_id debe ser un número entero válido.' })
    tienda_id: number;

    /** Estado de la venta (activo/inactivo) */
    @IsOptional()
    @IsBoolean({ message: 'El campo venta_activa debe ser un valor booleano.' })
    venta_activa?: boolean;
}
