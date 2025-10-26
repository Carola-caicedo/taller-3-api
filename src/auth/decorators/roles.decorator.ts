/**
 * Decorador personalizado para definir roles permitidos en una ruta.
 * 
 * Uso:
 * ```ts
 * @Roles('admin', 'empleado')
 * ```
 * Permite restringir el acceso a controladores o métodos
 * específicos según los roles asignados al usuario autenticado.
 */

import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
