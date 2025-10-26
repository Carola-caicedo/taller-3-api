/**
 * DTO (Data Transfer Object) utilizado para actualizar un administrador existente.
 *
 * Hereda todas las propiedades del DTO de creación (`CreateAdministradorDto`)
 * mediante `PartialType`, convirtiéndolas en opcionales.
 * 
 * Esto permite realizar actualizaciones parciales (solo algunos campos).
 * 
 * Ejemplo de uso:
 * ```json
 * PATCH /administrador/1
 * {
 *   "adm_correo": "nuevo@email.com"
 * }
 * ```
 */

import { PartialType } from '@nestjs/mapped-types';
import { CreateAdministradorDto } from './create-administrador.dto';

export class UpdateAdministradorDto extends PartialType(CreateAdministradorDto) {}
