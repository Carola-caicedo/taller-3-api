/**
 * DTO (Data Transfer Object) para actualizar una mascota.
 * 
 * Extiende de `CreateMascotaDto` pero hace todos los campos opcionales
 * para permitir actualizaciones parciales.
 */

import { PartialType } from '@nestjs/mapped-types';
import { CreateMascotaDto } from './create-mascota.dto';

export class UpdateMascotaDto extends PartialType(CreateMascotaDto) {}
