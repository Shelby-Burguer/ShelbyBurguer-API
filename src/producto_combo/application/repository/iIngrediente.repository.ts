import { collectionEntity } from '../../infrestructure/orm/collection.orm';

export interface icollectionRepository {
  getIngrediente(): Promise<collectionEntity[]>;
  createIngrediente(_collection: collectionEntity): Promise<collectionEntity>;
  updateIngrediente(_collection: collectionEntity): Promise<collectionEntity>;
}
