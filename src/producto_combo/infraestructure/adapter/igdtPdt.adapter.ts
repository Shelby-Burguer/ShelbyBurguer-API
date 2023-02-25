import { Injectable } from '@nestjs/common';
//import { collectionEntity } from '../orm/collection.orm';
import { iIngredienteRepository } from '../../application/repository/iIngrediente.repository';
import { Repository, EntityRepository, getRepository } from 'typeorm';
import { ingredienteEntity } from '../orm/ingrediente.orm';
import { iProductoRepository } from '../../application/repository/producto.repository';
import { productoEntity } from '../orm/producto.orm';
import { iIgdtPdtRepository } from 'src/producto_combo/application/repository/igdtPdt.repository';
import { igdt_pdtEntity } from '../orm/igdt_pdt.orm';

@EntityRepository(igdt_pdtEntity)
@Injectable()
export class igdtPdtPersisteceAdapter
  extends Repository<igdt_pdtEntity>
  implements iIgdtPdtRepository
{

  async getAllIgdtPdt(): Promise<igdt_pdtEntity[]> {
    const igdtPdtRepository = getRepository(igdt_pdtEntity);
    const igdtPdt: igdt_pdtEntity[] = await igdtPdtRepository.find({relations: ['ingrediente', 'producto'],});
    return igdtPdt;
  }

    async getAllIgdtPdtid(_igdtPdtEntity: igdt_pdtEntity): Promise<igdt_pdtEntity[]> {
    const igdtPdtRepository = getRepository(igdt_pdtEntity);
    const igdtPdt: igdt_pdtEntity[] = await igdtPdtRepository.find({         
        where: { producto_id:_igdtPdtEntity.igdt_pdt_id},
        relations: ['ingrediente', 'producto']
        });
    return igdtPdt;
  }

  async createIgdtPdt(
    _igdtPdtEntity: igdt_pdtEntity,
  ): Promise<string> {
    console.log(_igdtPdtEntity)
    const igdtPdtRepository = getRepository(igdt_pdtEntity);
    const igdtPdt: igdt_pdtEntity = await igdtPdtRepository.save({
      igdt_pdt_id: _igdtPdtEntity.igdt_pdt_id,
      cantidad_igdt_pdt: _igdtPdtEntity.cantidad_igdt_pdt,
      ingrediente_id: _igdtPdtEntity.ingrediente_id,
      producto_id: _igdtPdtEntity.producto_id,
      /*ingrediente: _igdtPdtEntity.ingrediente,
      producto: _igdtPdtEntity.producto*/
      /*relations: ['ingrediente', 'producto'],*/
    });
    let messageDelete: string = 'Eiminación realizada';
    return messageDelete;
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
