/**
 * Entidad que representa un detalle de factura o línea de venta.
 * 
 * Cada registro corresponde a un producto vendido dentro de una venta
 * y contiene información sobre cantidad, precio y subtotal.
 */

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Venta } from '../../venta/entities/venta.entity';
import { Producto } from '../../producto/entities/producto.entity';

@Entity('detalle_factura')
export class DetalleFactura {
    /** Identificador único del detalle */
    @PrimaryGeneratedColumn()
    det_id: number;

    /** Cantidad de unidades del producto en la venta */
    @Column({ type: 'int' })
    det_cantidad: number;

    /** Precio unitario del producto */
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    det_precio_unitario: number;

    /** Subtotal calculado (cantidad * precio) */
    @Column({ type: 'decimal', precision: 12, scale: 2 })
    det_subtotal: number;

    /** Relación con la venta a la que pertenece el detalle */
    @ManyToOne(() => Venta, (venta) => venta.detalles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'venta_id' })
    venta: Venta;

    /** ID de la venta asociada */
    @Column()
    venta_id: number;

    /** Relación con el producto vendido */
    @ManyToOne(() => Producto, { eager: true })
    @JoinColumn({ name: 'producto_id' })
    producto: Producto;

    /** ID del producto vendido */
    @Column()
    producto_id: number;

    /** Fecha de creación del registro */
    @CreateDateColumn()
    creado_en: Date;

    /** Fecha de última actualización */
    @UpdateDateColumn()
    actualizado_en: Date;
}
