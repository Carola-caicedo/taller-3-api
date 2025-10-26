/**
 * Entidad que representa un producto dentro del sistema.
 * 
 * Incluye relaciones con el proveedor, el inventario y el detalle de factura.
 */

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Proveedor } from '../../proveedor/entities/proveedor.entity';
import { Inventario } from '../../inventario/entities/inventario.entity';
import { DetalleFactura } from '../../detalle-factura/entities/detalle-factura.entity';

@Entity('productos')
export class Producto {
    /** Identificador único del producto */
    @PrimaryGeneratedColumn()
    prod_id: number;

    /** Nombre del producto */
    @Column({ length: 100 })
    prod_nombre: string;

    /** Descripción detallada del producto */
    @Column({ type: 'text', nullable: true })
    prod_descripcion?: string;

    /** Precio unitario del producto */
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    prod_precio: number;

    /** Cantidad disponible en stock */
    @Column({ type: 'int', default: 0 })
    prod_stock: number;

    /** Estado del producto (activo o inactivo) */
    @Column({ type: 'boolean', default: true })
    prod_activo: boolean;

    /** Relación con el proveedor del producto */
    @ManyToOne(() => Proveedor, (proveedor) => proveedor.productos, { nullable: true })
    @JoinColumn({ name: 'prove_id' })
    proveedor?: Proveedor;

    /** ID del proveedor asociado */
    @Column({ nullable: true })
    prove_id?: number;

    /** Relación con los registros de inventario */
    @OneToMany(() => Inventario, (inventario) => inventario.producto)
    inventarios: Inventario[];

    /** Relación con los detalles de factura */
    @OneToMany(() => DetalleFactura, (detalle) => detalle.producto)
    detallesFactura: DetalleFactura[];

    /** Fecha de creación del registro */
    @CreateDateColumn()
    creado_en: Date;

    /** Fecha de última actualización */
    @UpdateDateColumn()
    actualizado_en: Date;
}
