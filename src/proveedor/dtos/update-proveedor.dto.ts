/**
 * DTO (Data Transfer Object) para actualizar los datos de un proveedor.
 * 
 * Hereda las validaciones de `CreateProveedorDto` y las vuelve opcionales
 * para permitir actualizaciones parciales.
 */

import { PartialType } from '@nestjs/mapped-types';
import { CreateProveedorDto } from './create-proveedor.dto';

export class UpdateProveedorDto extends PartialType(CreateProveedorDto) {}
