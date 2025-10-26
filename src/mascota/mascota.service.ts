/**
 * Servicio que gestiona la lógica de negocio para el módulo Mascota.
 * 
 * Implementa las operaciones CRUD, así como la búsqueda de mascotas
 * por cliente. Utiliza el repositorio de TypeORM para la persistencia.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mascota } from './entities/mascota.entity';
import { CreateMascotaDto } from './dtos/create-mascota.dto';
import { UpdateMascotaDto } from './dtos/update-mascota.dto';

@Injectable()
export class MascotaService {
    constructor(
        @InjectRepository(Mascota)
        private readonly mascotaRepository: Repository<Mascota>,
    ) {}

    /**
     * Crea una nueva mascota y la asocia a un cliente.
     * 
     * @param createMascotaDto - Datos de la nueva mascota.
     * @returns Mascota creada.
     */
    async create(createMascotaDto: CreateMascotaDto): Promise<Mascota> {
        const mascota = this.mascotaRepository.create({
            ...createMascotaDto,
            cliente: { cli_id: createMascotaDto.cli_id },
        });
        return await this.mascotaRepository.save(mascota);
    }

    /**
     * Obtiene todas las mascotas registradas junto con su cliente.
     * 
     * @returns Lista de mascotas con sus relaciones.
     */
    async findAll(): Promise<Mascota[]> {
        return await this.mascotaRepository.find({ relations: ['cliente'] });
    }

    /**
     * Busca una mascota por su ID.
     * 
     * @param id - Identificador único de la mascota.
     * @returns Mascota encontrada.
     * @throws NotFoundException - Si no existe la mascota.
     */
    async findOne(id: number): Promise<Mascota> {
        const mascota = await this.mascotaRepository.findOne({
            where: { mascota_id: id },
            relations: ['cliente'],
        });

        if (!mascota) {
            throw new NotFoundException(`Mascota con ID ${id} no encontrada`);
        }
        return mascota;
    }

    /**
     * Obtiene todas las mascotas asociadas a un cliente.
     * 
     * @param clienteId - ID del cliente dueño de las mascotas.
     * @returns Lista de mascotas del cliente.
     */
    async findByCliente(clienteId: number): Promise<Mascota[]> {
        return await this.mascotaRepository.find({
            where: { cliente: { cli_id: clienteId } },
            relations: ['cliente'],
        });
    }

    /**
     * Actualiza los datos de una mascota existente.
     * 
     * @param id - ID de la mascota a actualizar.
     * @param updateMascotaDto - Datos nuevos.
     * @returns Mascota actualizada.
     */
    async update(id: number, updateMascotaDto: UpdateMascotaDto): Promise<Mascota> {
        const mascota = await this.findOne(id);
        Object.assign(mascota, updateMascotaDto);
        return await this.mascotaRepository.save(mascota);
    }

    /**
     * Elimina una mascota del sistema.
     * 
     * @param id - Identificador de la mascota a eliminar.
     * @returns Mensaje de confirmación.
     */
    async remove(id: number): Promise<{ message: string }> {
        const mascota = await this.findOne(id);
        await this.mascotaRepository.remove(mascota);
        return { message: `Mascota con ID ${id} eliminada correctamente` };
    }
}
