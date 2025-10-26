import { PartialType } from '@nestjs/mapped-types';
import { CreateTiendaDto } from './create-tienda.dto';

/**
 * DTO para actualizar una tienda existente.
 * 
 * Extiende del DTO de creación, pero hace que todos los campos sean opcionales.
 */
export class UpdateTiendaDto extends PartialType(CreateTiendaDto) {}
