/**
 * Entidad que representa una venta o factura completa dentro del sistema.
 * 
 * Incluye relaciones con cliente, empleado, tienda y los detalles de factura.
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
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Empleado } from '../../empleado/entities/empleado.entity';
import { Tienda } from '../../tienda/entities/tienda.entity';
import { DetalleFactura } from '../../detalle-factura/entities/detalle-factura.entity';

@Entity('ventas')
export class Venta {
  /** Identificador único de la venta */
  @PrimaryGeneratedColumn()
  venta_id: number;

  /** Fecha en la que se realizó la venta */
  @Column({ type: 'date' })
  venta_fecha: Date;

  /** Total monetario de la venta */
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  venta_total: number;

  /** Relación con el cliente asociado a la venta */
  @ManyToOne(() => Cliente, (cliente) => cliente.ventas, { eager: true })
  @JoinColumn({ name: 'cli_id' })
  cliente: Cliente;

  @Column()
  cli_id: number;

  /** Relación con el empleado que registró la venta */
  @ManyToOne(() => Empleado, (empleado) => empleado.ventas, { eager: true })
  @JoinColumn({ name: 'emp_id' })
  empleado: Empleado;

  @Column()
  emp_id: number;

  /** Relación con la tienda donde se realizó la venta */
  @ManyToOne(() => Tienda, { eager: true })
  @JoinColumn({ name: 'tienda_id' })
  tienda: Tienda;

  @Column()
  tienda_id: number;

  /** Relación con los detalles de la factura */
  @OneToMany(() => DetalleFactura, (detalle) => detalle.venta, { cascade: true })
  detalles: DetalleFactura[];

  /** Estado de la venta (activa o anulada) */
  @Column({ type: 'boolean', default: true })
  venta_activa: boolean;

  /** Fecha de creación del registro */
  @CreateDateColumn()
  creado_en: Date;

  /** Fecha de última actualización */
  @UpdateDateColumn()
  actualizado_en: Date;
}
