/**
 * Entidad que representa un administrador dentro del sistema.
 * 
 * Esta clase define la estructura de la tabla `administradores` en la base de datos
 * y sus columnas. Además, maneja el cifrado de contraseñas utilizando la librería `argon2`
 * antes de insertar o actualizar registros.
 */

import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as argon2 from 'argon2';

@Entity('administradores')
export class Administrador {
    /** Identificador único del administrador */
    @PrimaryGeneratedColumn()
    adm_id: number;

    /** Nombre completo del administrador */
    @Column({ length: 100 })
    adm_nombre: string;

    /** Nombre de usuario para inicio de sesión */
    @Column({ unique: true, length: 50 })
    adm_usuario: string;

    /** Contraseña cifrada con Argon2 (no se devuelve en consultas) */
    @Column({ select: false })
    adm_contrasena: string;

    /** Correo electrónico del administrador */
    @Column({ unique: true, length: 100 })
    adm_correo: string;

    /** Estado del administrador (activo/inactivo) */
    @Column({ default: true })
    adm_activo: boolean;

    /**
     * Hook que cifra automáticamente la contraseña antes de insertar o actualizar.
     */
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.adm_contrasena) {
            this.adm_contrasena = await argon2.hash(this.adm_contrasena);
        }
    }

    /**
     * Verifica si una contraseña en texto plano coincide con la almacenada cifrada.
     * 
     * @param plainPassword - Contraseña sin cifrar.
     * @returns `true` si coincide, `false` en caso contrario.
     */
    async validarContrasena(plainPassword: string): Promise<boolean> {
        return await argon2.verify(this.adm_contrasena, plainPassword);
    }
}
