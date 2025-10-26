/**
 * Entidad que representa una mascota dentro del sistema.
 * 
 * Cada mascota pertenece a un cliente, lo que crea una relación
 * Muchos-a-Uno (ManyToOne) con la entidad Cliente.
 */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';

@Entity('mascotas')
export class Mascota {
    /** Identificador único de la mascota */
    @PrimaryGeneratedColumn()
    mascota_id: number;

    /** Nombre de la mascota */
    @Column({ length: 100 })
    mascota_nombre: string;

    /** Especie de la mascota (Ej: Perro, Gato, Ave, etc.) */
    @Column({ length: 50 })
    mascota_especie: string;

    /** Raza de la mascota (opcional) */
    @Column({ length: 50, nullable: true })
    mascota_raza: string;

    /** Edad de la mascota en años (opcional) */
    @Column({ type: 'int', nullable: true })
    mascota_edad: number;

    /** Relación Muchos-a-Uno con el cliente dueño de la mascota */
    @ManyToOne(() => Cliente, (cliente) => cliente.mascotas)
    @JoinColumn({ name: 'cli_id' })
    cliente: Cliente;
}
