import { Injectable } from '@nestjs/common';
//import { collectionEntity } from '../orm/collection.orm';
import { iIngredienteRepository } from '../../application/repository/iIngrediente.repository';
import { Repository, EntityRepository, getRepository } from 'typeorm';
import { ingrediente } from 'src/producto_combo/domain/models/ingrediente';
import { ingredienteEntity } from '../orm/ingrediente.orm';

@EntityRepository(ingredienteEntity)
@Injectable()
export class ingredientePersisteceAdapter
  extends Repository<ingredienteEntity>
  implements iIngredienteRepository
{
  async getIngrediente(): Promise<ingredienteEntity[]> {
    const ingredienteRepository = getRepository(ingredienteEntity);
    const ingrediente: ingredienteEntity[] = await ingredienteRepository.find();
    return ingrediente;
  }

 /* async createCollection(
    _collectionEntity: collectionEntity,
  ): Promise<collectionEntity> {
    const collectionRepository = getRepository(collectionEntity);
    const collection: collectionEntity = await collectionRepository.save({
      collection_id: _collectionEntity.collection_id,
      collection_name: _collectionEntity.collection_name,
    });
    return collection;
  }

  async updateCollection(_collectionEntity: collectionEntity): Promise<collectionEntity> {
    const collectionRepository = getRepository(collectionEntity);
    await collectionRepository.update(_collectionEntity.collection_id, {
      collection_name: _collectionEntity.collection_name,
    });

    const collction: collectionEntity = await collectionRepository.findOne({
      collection_id: _collectionEntity.collection_id,
    });
    return collction;
  }
*/
}
