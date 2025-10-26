/**
 * Entidad que representa una tienda dentro del sistema.
 * 
 * Cada tienda puede tener múltiples empleados asociados.
 * Incluye campos de auditoría y estado (activa/inactiva).
 */

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Empleado } from '../../empleado/entities/empleado.entity';

@Entity('tiendas')
export class Tienda {
    /** Identificador único de la tienda */
    @PrimaryGeneratedColumn()
    tienda_id: number;

    /** Nombre comercial de la tienda */
    @Column({ length: 100 })
    tienda_nombre: string;

    /** Dirección física de la tienda */
    @Column({ length: 150 })
    tienda_direccion: string;

    /** Ciudad donde se encuentra la tienda */
    @Column({ length: 80 })
    tienda_ciudad: string;

    /** Teléfono de contacto de la tienda */
    @Column({ length: 20 })
    tienda_telefono: string;

    /** Estado de la tienda (true = activa, false = inactiva) */
    @Column({ type: 'boolean', default: true })
    tienda_activa: boolean;

    /** Relación con los empleados que pertenecen a esta tienda */
    @OneToMany(() => Empleado, (empleado) => empleado.tienda)
    empleados: Empleado[];

    /** Fecha de creación del registro */
    @CreateDateColumn()
    creada_en: Date;

    /** Fecha de última actualización */
    @UpdateDateColumn()
    actualizada_en: Date;
}
