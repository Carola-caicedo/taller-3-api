/**
 * Entidad que representa un proveedor dentro del sistema.
 * 
 * Cada proveedor puede tener varios productos asociados.
 */

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Producto } from '../../producto/entities/producto.entity';

@Entity('proveedores')
export class Proveedor {
    /** Identificador único del proveedor */
    @PrimaryGeneratedColumn()
    prove_id: number;

    /** Nombre del proveedor o empresa */
    @Column({ length: 100 })
    prove_nombre: string;

    /** Correo electrónico del proveedor */
    @Column({ unique: true, length: 100 })
    prove_email: string;

    /** Teléfono de contacto */
    @Column({ length: 15 })
    prove_telefono: string;

    /** Dirección física del proveedor */
    @Column({ length: 200 })
    prove_direccion: string;

    /** RUC o NIT (registro único tributario) */
    @Column({ length: 20, unique: true })
    prove_ruc: string;

    /** Estado del proveedor (activo/inactivo) */
    @Column({ default: true })
    prove_activo: boolean;

    /** Relación uno a muchos con los productos asociados */
    @OneToMany(() => Producto, (producto) => producto.proveedor)
    productos: Producto[];

    /** Fecha de creación del registro */
    @CreateDateColumn()
    creado_en: Date;

    /** Fecha de última actualización */
    @UpdateDateColumn()
    actualizado_en: Date;
}
