/**
 * DTO (Data Transfer Object) para actualizar un producto.
 * 
 * Extiende de `CreateProductoDto`, haciendo sus campos opcionales
 * para permitir actualizaciones parciales.
 */

import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {}
