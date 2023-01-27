import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { icollectionRepository } from '../repository/Icollection.repository';
import { readCollectionDto } from '../dto/collection.read.dto';
import { collection } from '../../domain/models/collection.model';
import { forwardRef } from '@nestjs/common';
import { ingredienteDataMapper } from '../../domain/mappers/ingrediente.mapper';
import { collectionPersisteceAdapter } from '../../infrestructure/Adapter/collection.persistance.adapter';
import { InjectRepository } from '@nestjs/typeorm';
import { collectionEntity } from '../../infrestructure/orm/collection.orm';

@Injectable()
export class ingredienteService {
  constructor(
    @InjectRepository(ingredientePersisteceAdapter)
    private readonly _iIngredienteRepository: iIngredienteRepository,
    private readonly _mapper: ingredienteDataMapper,
  ) {}

  async getCollection(): Promise<collection[]> {
    const collectionEntity = await this._icollectionRepository.getCollection();
    return collectionEntity.map((collection: collectionEntity) =>
      this._mapper.toDomain(collection),
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
