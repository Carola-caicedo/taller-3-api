/**
 * Servicio encargado de la lógica de negocio de empleados.
 * 
 * Implementa las operaciones CRUD, búsqueda filtrada y
 * gestión de estado (activo/inactivo). También maneja el cifrado de contraseñas.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from './entities/empleado.entity';
import { CreateEmpleadoDto } from './dtos/create-empleado.dto';
import { UpdateEmpleadoDto } from './dtos/update-empleado.dto';
import { Tienda } from '../tienda/entities/tienda.entity';
import { Venta } from '../venta/entities/venta.entity';
import * as argon2 from 'argon2';

@Injectable()
export class EmpleadoService {
    constructor(
        @InjectRepository(Empleado)
        private readonly empleadoRepository: Repository<Empleado>,

        @InjectRepository(Tienda)
        private readonly tiendaRepository: Repository<Tienda>,

        @InjectRepository(Venta)
        private readonly ventaRepository: Repository<Venta>,
    ) {}

    /** Crea un nuevo empleado, encriptando su contraseña si se proporciona. */
    async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
        const { tienda_id, emp_contrasena } = createEmpleadoDto;
        const hashedPass = emp_contrasena ? await argon2.hash(emp_contrasena) : null;

        const empleadoPartial = this.empleadoRepository.create({
            ...createEmpleadoDto,
            emp_contrasena: hashedPass,
            tienda: tienda_id ? { tienda_id } : null,
        } as any);

        const saved = await this.empleadoRepository.save(empleadoPartial as any);
        return Array.isArray(saved) ? (saved[0] as Empleado) : (saved as Empleado);
    }

    /** Obtiene todos los empleados, con filtros opcionales por estado y cargo. */
    async findAll(filters?: { activo?: boolean; cargo?: string }): Promise<Empleado[]> {
        const query = this.empleadoRepository
            .createQueryBuilder('empleado')
            .leftJoinAndSelect('empleado.tienda', 'tienda')
            .leftJoinAndSelect('empleado.ventas', 'ventas');

        if (filters?.activo !== undefined)
            query.andWhere('empleado.emp_activo = :activo', { activo: filters.activo });
        if (filters?.cargo)
            query.andWhere('empleado.emp_cargo LIKE :cargo', { cargo: `%${filters.cargo}%` });

        return await query.getMany();
    }

    /** Busca un empleado por correo electrónico. */
    async findByCorreo(emp_email: string): Promise<Empleado | null> {
        return await this.empleadoRepository.findOne({ where: { emp_email } });
    }

    /** Obtiene un empleado por su identificador único. */
    async findOne(id: number): Promise<Empleado> {
        const empleado = await this.empleadoRepository.findOne({
            where: { emp_id: id },
            relations: ['tienda', 'ventas'],
        });

        if (!empleado) throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
        return empleado;
    }

    /** Obtiene todos los empleados pertenecientes a una tienda. */
    async findByTienda(tiendaId: number): Promise<Empleado[]> {
        return await this.empleadoRepository.find({
            where: { tienda: { tienda_id: tiendaId } },
            relations: ['tienda', 'ventas'],
        });
    }

    /** Busca empleados por su cargo. */
    async findByCargo(cargo: string): Promise<Empleado[]> {
        return await this.empleadoRepository.find({
            where: { emp_cargo: cargo },
            relations: ['tienda', 'ventas'],
        });
    }

    /** Actualiza los datos de un empleado. */
    async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto): Promise<Empleado> {
        const empleado = await this.findOne(id);

        if (updateEmpleadoDto.emp_contrasena) {
            updateEmpleadoDto.emp_contrasena = await argon2.hash(updateEmpleadoDto.emp_contrasena);
        }

        Object.assign(empleado, updateEmpleadoDto);

        if (updateEmpleadoDto.tienda_id) {
            empleado.tienda = { tienda_id: updateEmpleadoDto.tienda_id } as Tienda;
        }

        const saved = await this.empleadoRepository.save(empleado as any);
        return Array.isArray(saved) ? (saved[0] as Empleado) : (saved as Empleado);
    }

    /** Activa o desactiva un empleado. */
    async updateEstado(id: number, activo: boolean): Promise<Empleado> {
        const empleado = await this.findOne(id);
        empleado.emp_activo = activo;
        const saved = await this.empleadoRepository.save(empleado as any);
        return Array.isArray(saved) ? (saved[0] as Empleado) : (saved as Empleado);
    }

    /** Elimina un empleado del sistema. */
    async remove(id: number): Promise<void> {
        const empleado = await this.findOne(id);
        await this.empleadoRepository.remove(empleado);
    }
}
