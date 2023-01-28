import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ingrediente } from '../../domain/models/ingrediente';
import { idIngrediente } from '../../domain/models/idIngrediente';
import { forwardRef } from '@nestjs/common';
import { ingredienteDataMapper } from '../../domain/mappers/ingrediente.mapper';
import { ingredientePersisteceAdapter } from '../../infraestructure/adapter/ingrediente.adapter';
import { InjectRepository } from '@nestjs/typeorm';
import { iIngredienteRepository } from '../repository/iIngrediente.repository';
import { ingredienteEntity } from '../../infraestructure/orm/ingrediente.orm';
import { idIngredienteDto } from '../../application/dto/idIngrediente.dto';

@Injectable()
export class ingredienteService {
  constructor(
    @InjectRepository(ingredientePersisteceAdapter)
    private readonly _iIngredienteRepository: iIngredienteRepository,
    private readonly _mapper: ingredienteDataMapper,
  ) {}

  async getIngrediente(): Promise<ingrediente[]> {
    const ingredienteEntity =
      await this._iIngredienteRepository.getIngrediente();
    return ingredienteEntity.map((ingrediente: ingredienteEntity) =>
      this._mapper.toDomain(ingrediente),
    );
  }

  async createIngrediente(ingrediente: ingrediente): Promise<ingrediente> {
    const createdIngredienteEntity: ingredienteEntity =
      await this._iIngredienteRepository.createIngrediente(
        this._mapper.toDalEntity(ingrediente),
      );
    return this._mapper.toDomain(createdIngredienteEntity);
  }

  async updateingrediente(ingrediente: ingrediente): Promise<ingrediente> {
    const UpdateIngredienteEntity: ingredienteEntity =
      await this._iIngredienteRepository.updateIngrediente(
        this._mapper.toDalEntity(ingrediente),
      );
    return this._mapper.toDomain(UpdateIngredienteEntity);
  }

  async deleteIngrediente(ingrediente: idIngrediente): Promise<string> {
    const deleteIngredienteEntity: string =
      await this._iIngredienteRepository.deleteIngrediente(
        this._mapper.deletetoDalEntity(ingrediente),
      );
    return deleteIngredienteEntity;
  }
}
