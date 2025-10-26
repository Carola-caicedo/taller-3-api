/**
 * Guard que valida que el usuario autenticado tenga uno de los roles permitidos.
 * 
 * Se utiliza junto con:
 * - `@UseGuards(JwtAuthGuard, RolesGuard)`
 * - El decorador `@Roles()`
 * 
 * Si el usuario no tiene un rol válido o no está autenticado, lanza una excepción `ForbiddenException`.
 */

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        // Obtiene los roles definidos mediante el decorador @Roles
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) return true; // Si la ruta no tiene roles, se permite el acceso

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !user.rol) {
            throw new ForbiddenException('No se pudo validar el rol del usuario.');
        }

        // Verifica si el rol del usuario coincide con alguno de los permitidos
        if (!roles.includes(user.rol)) {
            throw new ForbiddenException(`Acceso denegado: requiere rol ${roles.join(' o ')}`);
        }

        return true;
    }
}
