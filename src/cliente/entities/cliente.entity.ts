/**
 * Entidad que representa a un cliente dentro del sistema.
 * 
 * Define la estructura de la tabla `clientes` en la base de datos
 * y sus relaciones con otras entidades (ventas y mascotas).
 */

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Venta } from '../../venta/entities/venta.entity';
import { Mascota } from '../../mascota/entities/mascota.entity';

@Entity('clientes')
export class Cliente {
    /** Identificador único del cliente */
    @PrimaryGeneratedColumn()
    cli_id: number;

    /** Nombre completo del cliente */
    @Column({ length: 100 })
    cli_nombre: string;

    /** Correo electrónico del cliente (único) */
    @Column({ unique: true, length: 100 })
    cli_correo: string;

    /**
     * Contraseña cifrada del cliente.
     * 
     * No se incluye en las consultas por defecto (`select: false`)
     * para proteger información sensible.
     */
    @Column({ select: false, nullable: true })
    cli_contrasena?: string;

    /** Teléfono de contacto del cliente */
    @Column({ length: 15 })
    cli_telefono: string;

    /** Dirección física del cliente */
    @Column({ length: 200 })
    cli_direccion: string;

    /** Estado del cliente: activo o inactivo */
    @Column({ default: true })
    cli_activo: boolean;

    /** Relación uno a muchos con las ventas asociadas al cliente */
    @OneToMany(() => Venta, (venta) => venta.cliente)
    ventas: Venta[];

    /** Relación uno a muchos con las mascotas registradas por el cliente */
    @OneToMany(() => Mascota, (mascota) => mascota.cliente)
    mascotas: Mascota[];
}
