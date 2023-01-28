import { ingredienteEntity } from '../../infraestructure/orm/ingrediente.orm';

export interface iIngredienteRepository {
  getIngrediente(): Promise<ingredienteEntity[]>;
/*  createIngrediente(_collection: collectionEntity): Promise<collectionEntity>;
  updateIngrediente(_collection: collectionEntity): Promise<collectionEntity>;
*/
}
