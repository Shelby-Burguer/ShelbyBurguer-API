import { Injectable } from '@nestjs/common';
//import { collectionEntity } from '../orm/collection.orm';
import { iIngredienteRepository } from '../../application/repository/iIngrediente.repository';
import { Repository, EntityRepository, getRepository } from 'typeorm';
import { ingredienteEntity } from '../orm/ingrediente.orm';
import { iProductoRepository } from '../../application/repository/producto.repository';
import { productoEntity } from '../orm/producto.orm';

@EntityRepository(ingredienteEntity)
@Injectable()
export class productoPersisteceAdapter
  extends Repository<ingredienteEntity>
  implements iProductoRepository
{

  async getAllIngrediente(): Promise<ingredienteEntity[]> {
    const ingredienteRepository = getRepository(ingredienteEntity);
    const ingrediente: ingredienteEntity[] = await ingredienteRepository.find();
    return ingrediente;
  }

    async getOneIngrediente(_ingredienteEntity: ingredienteEntity,): Promise<ingredienteEntity> {
    const ingredienteRepository = getRepository(ingredienteEntity);
    const ingrediente: ingredienteEntity = await ingredienteRepository.findOne(_ingredienteEntity);
    return ingrediente;
  }

  async createProducto(
    _productoEntity: productoEntity,
  ): Promise<productoEntity> {
    const productoRepository = getRepository(productoEntity);
    const producto: productoEntity = await productoRepository.save({
      producto_id: _productoEntity.producto_id,
      nombre_producto: _productoEntity.nombre_producto,
      tipo_producto: _productoEntity.tipo_producto,
      costo_producto: _productoEntity.costo_producto
    });
    
    return producto;
  }


    async createImagenIngrediente(
    _ingredienteEntity: ingredienteEntity,
  ): Promise<any> {
    const ingredienteRepository = getRepository(ingredienteEntity);
    const imagenIngrediente = await ingredienteRepository.update(_ingredienteEntity.ingrediente_id,{

      nombre_imagen: _ingredienteEntity.nombre_imagen,
      datos_imagen: _ingredienteEntity.datos_imagen,
    });

    const ingrediente: ingredienteEntity = await ingredienteRepository.findOne({
    ingrediente_id: _ingredienteEntity.ingrediente_id,
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
