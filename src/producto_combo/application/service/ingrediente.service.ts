import { Inject, Injectable } from '@nestjs/common';
import { ingrediente } from '../../domain/models/ingrediente';
import { idIngrediente } from '../../domain/models/idIngrediente';
import { ingredienteDataMapper } from '../../domain/mappers/ingrediente.mapper';
import { iIngredienteRepository } from '../repository/iIngrediente.repository';
import { ingredienteEntity } from '../../infraestructure/orm/ingrediente.orm';
import { idIngredienteDto } from '../../application/dto/idIngrediente.dto';
import { createImagenIngredienteDto } from '../dto/createImagenIngrediente.dto';

@Injectable()
export class ingredienteService {
  constructor(
    @Inject('iIngredienteRepository')
    private readonly _iIngredienteRepository: iIngredienteRepository,
    private readonly _mapper: ingredienteDataMapper,
  ) {}

  async getAllIngrediente(): Promise<ingrediente[]> {
    const ingredienteEntity =
      await this._iIngredienteRepository.getAllIngrediente();
    return ingredienteEntity.map((ingrediente: ingredienteEntity) =>
      this._mapper.toDomain(ingrediente),
    );
  }

  async getOneIngrediente(id: idIngrediente): Promise<ingrediente> {
    const IngredienteEntity: ingredienteEntity =
      await this._iIngredienteRepository.getOneIngrediente(
        this._mapper.toIdEntity(id),
      );
    return this._mapper.toDomain(IngredienteEntity);
  }

  async createIngrediente(ingrediente: ingrediente): Promise<ingrediente> {
    const createdIngredienteEntity: ingredienteEntity =
      await this._iIngredienteRepository.createIngrediente(
        this._mapper.toDalEntity(ingrediente),
      );
      console.log('vamo qlq esto', createdIngredienteEntity)
    return this._mapper.toDomain(createdIngredienteEntity);
  }
  
  async createImagenIngrediente(
    imagenIngrediente: createImagenIngredienteDto,
    idIngrediente: idIngredienteDto,
  ): Promise<any> {
    const createdIngredienteEntity: ingredienteEntity =
      await this._iIngredienteRepository.createImagenIngrediente(
        this._mapper.toDalEntityImagen(imagenIngrediente, idIngrediente),
      );
    return createdIngredienteEntity;
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
