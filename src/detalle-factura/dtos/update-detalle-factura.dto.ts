/**
 * DTO (Data Transfer Object) para la actualización de un detalle de factura.
 * 
 * Extiende del DTO de creación y convierte sus campos en opcionales.
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleFacturaDto } from './create-detalle-factura.dto';

export class UpdateDetalleFacturaDto extends PartialType(CreateDetalleFacturaDto) {}
