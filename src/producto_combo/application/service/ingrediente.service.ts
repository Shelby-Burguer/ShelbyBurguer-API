import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
//import { icollectionRepository } from '../repository/Icollection.repository';
//import { readCollectionDto } from '../dto/collection.read.dto';
import { ingrediente } from '../../domain/models/ingrediente';
import { forwardRef } from '@nestjs/common';
import { ingredienteDataMapper } from '../../domain/mappers/ingrediente.mapper';
import { ingredientePersisteceAdapter } from '../../infraestructure/adapter/ingrediente.adapter';
import { InjectRepository } from '@nestjs/typeorm';
//import { collectionEntity } from '../../infrestructure/orm/collection.orm';
import { iIngredienteRepository } from '../repository/iIngrediente.repository';
import { ingredienteEntity } from '../../infraestructure/orm/ingrediente.orm';

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
    console.log(ingredienteEntity);
    return ingredienteEntity.map((ingrediente: ingredienteEntity) =>
      this._mapper.toDomain(ingrediente),
    );
  }

  /*
   async createCollection(collection: collection): Promise<collection> {
    const createdCollectionEntity: collectionEntity =
      await this._icollectionRepository.createCollection(
        this._mapper.toDalEntity(collection),
      );
    return this._mapper.toDomain(createdCollectionEntity);
  }

    async updateCollection(collection: collection): Promise<collection> {
    const createdCollectionEntity: collectionEntity =
      await this._icollectionRepository.updateCollection(
        this._mapper.toDalEntity(collection),
      );
    return this._mapper.toDomain(createdCollectionEntity);
  }
*/
}
