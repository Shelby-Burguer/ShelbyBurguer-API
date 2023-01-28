import { Injectable } from '@nestjs/common';
//import { collectionEntity } from '../orm/collection.orm';
import { iIngredienteRepository } from '../../application/repository/iIngrediente.repository';
import { Repository, EntityRepository, getRepository } from 'typeorm';
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

  async createIngrediente(
    _ingredienteEntity: ingredienteEntity,
  ): Promise<ingredienteEntity> {
    const ingredienteRepository = getRepository(ingredienteEntity);
    const ingrediente: ingredienteEntity = await ingredienteRepository.save({
      ingrediente_id: _ingredienteEntity.ingrediente_id,
      nombre_ingrediente: _ingredienteEntity.nombre_ingrediente,
      unidad_ingrediente: _ingredienteEntity.unidad_ingrediente,
    });
    return ingrediente;
  }

  async updateIngrediente(
    _ingredienteEntity: ingredienteEntity,
  ): Promise<ingredienteEntity> {
    const ingredienteRepository = getRepository(ingredienteEntity);
    await ingredienteRepository.update(_ingredienteEntity.ingrediente_id, {
      nombre_ingrediente: _ingredienteEntity.nombre_ingrediente,
      unidad_ingrediente: _ingredienteEntity.unidad_ingrediente,
    });

    const ingrediente: ingredienteEntity = await ingredienteRepository.findOne({
      ingrediente_id: _ingredienteEntity.ingrediente_id,
    });
    return ingrediente;
  }

  async deleteIngrediente(_ingredienteEntity: ingredienteEntity): Promise<any> {
    const ingredienteRepository = getRepository(ingredienteEntity);
    await ingredienteRepository.delete(_ingredienteEntity.ingrediente_id);
    let messageDelete: string = 'Eiminación realizada';

    return messageDelete;
  }
}
