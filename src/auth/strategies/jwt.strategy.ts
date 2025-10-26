/**
 * Estrategia JWT para Passport.
 * 
 * Define cómo se extrae y valida el token JWT desde la cabecera
 * `Authorization: Bearer <token>`, y qué datos se inyectan en `request.user`.
 */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) throw new Error('JWT_SECRET no está definido en el archivo .env');

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
        });
    }

    /**
     * Valida el token y define qué información se pasa al contexto del request.
     * @param payload - Contenido decodificado del token JWT.
     * @returns Objeto con datos del usuario autenticado.
     */
    async validate(payload: any) {
        return { id: payload.id, correo: payload.correo, rol: payload.rol };
    }
}
