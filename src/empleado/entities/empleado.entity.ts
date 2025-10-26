/**
 * Entidad que representa un empleado dentro del sistema.
 * 
 * Define la estructura de la tabla `empleados` en la base de datos
 * y sus relaciones con las entidades `Tienda` y `Venta`.
 */

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { Tienda } from '../../tienda/entities/tienda.entity';
import { Venta } from '../../venta/entities/venta.entity';

@Entity('empleados')
export class Empleado {
    /** Identificador único del empleado */
    @PrimaryGeneratedColumn()
    emp_id: number;

    /** Nombre completo del empleado */
    @Column({ length: 100 })
    emp_nombre: string;

    /** Correo electrónico único del empleado */
    @Column({ unique: true, length: 100 })
    emp_email: string;

    /** Contraseña cifrada del empleado (no se devuelve en consultas) */
    @Column({ select: false })
    emp_contrasena: string;

    /** Cargo o puesto laboral */
    @Column({ length: 50 })
    emp_cargo: string;

    /** Estado del empleado (activo o inactivo) */
    @Column({ default: true })
    emp_activo: boolean;

    /** Relación muchos a uno con la tienda a la que pertenece */
    @ManyToOne(() => Tienda, (tienda) => tienda.empleados, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'tienda_id' })
    tienda: Tienda;

    /** ID de la tienda asociada */
    @Column({ nullable: true })
    tienda_id: number;

    /** Relación uno a muchos con las ventas realizadas por el empleado */
    @OneToMany(() => Venta, (venta) => venta.empleado)
    ventas: Venta[];
}
