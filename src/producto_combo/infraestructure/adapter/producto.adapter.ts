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

  async getAllProducto(): Promise<productoEntity[]> {
    const productoRepository = getRepository(productoEntity);
    const producto: productoEntity[] = await productoRepository.find();
    return producto;
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
      costo_producto: _productoEntity.costo_producto,
      nombre_imagen: _productoEntity.nombre_imagen
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

  async updateProducto(
    _productoEntity: productoEntity,
  ): Promise<productoEntity> {
    const productoRepository = getRepository(productoEntity);
    await productoRepository.update(_productoEntity.producto_id, {
      nombre_producto: _productoEntity.nombre_producto ,
      tipo_producto: _productoEntity.tipo_producto,
      costo_producto: _productoEntity.costo_producto
    });

    const ingrediente: productoEntity = await productoRepository.findOne({
      producto_id: _productoEntity.producto_id,
    });
    return ingrediente;
  }

  async deleteProducto(_productoEntity: productoEntity): Promise<string> {
    const ingredienteRepository = getRepository(productoEntity);
    console.log(_productoEntity);
    await ingredienteRepository.delete(_productoEntity.producto_id);
    let messageDelete: string = 'Eiminación realizada';

    return messageDelete;
  }
}
