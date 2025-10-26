/**
 * DTO para actualizar los datos de una venta existente.
 * 
 * Hereda las validaciones del DTO de creación y permite actualizaciones parciales.
 */

import { PartialType } from '@nestjs/mapped-types';
import { CreateVentaDto } from './create-venta.dto';

export class UpdateVentaDto extends PartialType(CreateVentaDto) {}
