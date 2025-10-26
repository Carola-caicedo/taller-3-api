/**
 * Entidad que representa el inventario de una tienda.
 * 
 * Cada registro indica cuántas unidades de un producto existen
 * en una tienda específica y su costo unitario.
 */

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Producto } from '../../producto/entities/producto.entity';
import { Tienda } from '../../tienda/entities/tienda.entity';

@Entity('inventarios')
export class Inventario {
    /** Identificador único del registro de inventario */
    @PrimaryGeneratedColumn()
    inv_id: number;

    /** Cantidad disponible del producto en la tienda */
    @Column({ type: 'int', default: 0 })
    inv_cantidad: number;

    /** Costo unitario del producto */
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    inv_costo_unitario: number;

    /** Relación con el producto correspondiente */
    @ManyToOne(() => Producto, (producto) => producto.inventarios, { eager: true })
    @JoinColumn({ name: 'prod_id' })
    producto: Producto;

    /** ID del producto asociado */
    @Column()
    prod_id: number;

    /** Relación con la tienda correspondiente */
    @ManyToOne(() => Tienda, (tienda) => tienda.empleados, { eager: true })
    @JoinColumn({ name: 'tienda_id' })
    tienda: Tienda;

    /** ID de la tienda asociada */
    @Column()
    tienda_id: number;

    /** Estado del registro (activo/inactivo) */
    @Column({ type: 'boolean', default: true })
    inv_activo: boolean;

    /** Fecha de creación del registro */
    @CreateDateColumn()
    creado_en: Date;

    /** Fecha de última actualización del registro */
    @UpdateDateColumn()
    actualizado_en: Date;
}
