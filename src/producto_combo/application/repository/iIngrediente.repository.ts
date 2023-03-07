import { ingredienteEntity } from '../../infraestructure/orm/ingrediente.orm';
export interface iIngredienteRepository {
  getAllIngrediente(): Promise<ingredienteEntity[]>;
  getOneIngrediente(
    _ingrediente: ingredienteEntity,
  ): Promise<ingredienteEntity>;
  createIngrediente(
    _ingrediente: ingredienteEntity,
  ): Promise<ingredienteEntity>;
  createImagenIngrediente(
    _ingrediente: ingredienteEntity,
  ): Promise<ingredienteEntity>;
  updateIngrediente(
    _ingrediente: ingredienteEntity,
  ): Promise<ingredienteEntity>;
  deleteIngrediente(_ingrediente: ingredienteEntity): Promise<string>;
}
