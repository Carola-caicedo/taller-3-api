/**
 * DTO (Data Transfer Object) para actualizar un registro de inventario existente.
 * 
 * Extiende de `CreateInventarioDto` y convierte sus propiedades en opcionales,
 * permitiendo actualizaciones parciales.
 */

import { PartialType } from '@nestjs/mapped-types';
import { CreateInventarioDto } from './create-inventario.dto';

export class UpdateInventarioDto extends PartialType(CreateInventarioDto) {}
