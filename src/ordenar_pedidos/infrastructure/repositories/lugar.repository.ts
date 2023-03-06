import { InjectRepository } from '@nestjs/typeorm';
import { Lugar } from 'src/ordenar_pedidos/domain/models/lugar';
import { ILugarRepository } from 'src/ordenar_pedidos/domain/repositories/lugar.repository.interface';
import { Repository } from 'typeorm/repository/Repository';
import LugarAdapter from '../adapters/lugar.adapter';
import { LugarEntity } from '../entities/lugar.entity';

export class LugarRepositoryImpl implements ILugarRepository {
  constructor(
    @InjectRepository(LugarEntity)
    private readonly lugarRepository: Repository<LugarEntity>,
  ) {}

  async create(lugar: Lugar): Promise<void> {
    const entity = LugarAdapter.toEntity(lugar);
    await this.lugarRepository.save(entity);
  }

  async findById(id: string): Promise<Lugar | undefined> {
    const entity = await this.lugarRepository.findOne({
      where: { id_lugar: id },
    });
    return LugarAdapter.toDomain(entity);
  }

  async findByNombre(nombre: string): Promise<Lugar | undefined> {
    const entity = await this.lugarRepository.findOne({
      where: { nombre_lugar: nombre },
    });
    return LugarAdapter.toDomain(entity);
  }

  async findAll(): Promise<Lugar[]> {
    const entities = await this.lugarRepository.find();
    return entities.map((entity) => LugarAdapter.toDomain(entity));
  }

  async update(id: string, lugar: Lugar): Promise<void> {
    const entity = LugarAdapter.toEntity(lugar);
    await this.lugarRepository.update(id, entity);
  }

  async delete(id: string): Promise<void> {
    await this.lugarRepository.delete(id);
  }
}