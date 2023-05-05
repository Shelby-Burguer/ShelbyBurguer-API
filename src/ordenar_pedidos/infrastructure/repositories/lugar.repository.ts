import { InjectRepository } from '@nestjs/typeorm';
import { Lugar } from 'src/ordenar_pedidos/domain/models/lugar';
import { ILugarRepository } from 'src/ordenar_pedidos/domain/repositories/lugar-repository.interface';
import { Repository } from 'typeorm/repository/Repository';
import UniqueId from '../../../shared/domain/UniqueUUID';
import idVo from '../../../shared/domain/vo/id';
import LugarAdapter from '../adapters/lugar.adapter';
import { LugarEntity } from '../entities/lugar.entity';
import { HttpException, InternalServerErrorException } from '@nestjs/common';

export class LugarRepositoryImpl implements ILugarRepository {
  constructor(
    @InjectRepository(LugarEntity)
    private readonly lugarRepository: Repository<LugarEntity>,
  ) {}

  async create(lugar: Lugar): Promise<void> {
  try {
    lugar.id = idVo.create(new UniqueId().getId());
    const entity = LugarAdapter.toEntityForCreate(lugar);
    await this.lugarRepository.save(entity);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findById(id: string): Promise<Lugar | undefined> {
  try {
    const entity = await this.lugarRepository.findOne({
      where: { id_lugar: id },
    });
    return LugarAdapter.toDomain(entity);
        } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findByNombre(nombre: string): Promise<Lugar | undefined> {
  try {
    const entity = await this.lugarRepository.findOne({
      where: { nombre_lugar: nombre },
    });
    return LugarAdapter.toDomain(entity);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAllByTipo(tipo: string): Promise<Lugar[] | undefined> {
  try {
    const capTipo = tipo.charAt(0).toUpperCase() + tipo.slice(1);
    const entities = await this.lugarRepository.find({
      where: { tipo_lugar: capTipo },
    });
    return entities.map((entity) => LugarAdapter.toDomain(entity));
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAll(): Promise<Lugar[]> {
  try {
    const entities = await this.lugarRepository.find();
    return entities.map((entity) => LugarAdapter.toDomain(entity));
      } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async update(id: string, lugar: Lugar): Promise<void> {
  try {
    const entity = LugarAdapter.toEntity(lugar);
    await this.lugarRepository.update(id, entity);
  } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async delete(id: string): Promise<void> {
  try {
    await this.lugarRepository.delete(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
