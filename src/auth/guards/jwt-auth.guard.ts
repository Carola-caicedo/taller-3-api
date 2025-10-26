/**
 * Guard de autenticación basado en JWT.
 * 
 * Este guard verifica automáticamente la validez del token JWT
 * antes de permitir el acceso a rutas protegidas.
 * 
 * Uso:
 * ```ts
 * @UseGuards(JwtAuthGuard)
 * ```
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
