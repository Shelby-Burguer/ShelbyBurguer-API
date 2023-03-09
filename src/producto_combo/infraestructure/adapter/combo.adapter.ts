import { Injectable } from '@nestjs/common';

import { iIngredienteRepository } from '../../application/repository/iIngrediente.repository';
import { Repository, EntityRepository, getRepository } from 'typeorm';
import { ingredienteEntity } from '../orm/ingrediente.orm';
import { iProductoRepository } from '../../application/repository/producto.repository';
import { productoEntity } from '../orm/producto.orm';
import { comboEntity } from '../orm/combo.orm';
import { pdt_cbEntity } from '../orm/pdt_cb.orm';
import { createComboDto } from '../../application/dto/createCombo.dto';
import { comboRepository } from '../../application/repository/combo.repository';
import UniqueId from '../../../shared/domain/UniqueUUID';

@EntityRepository(ingredienteEntity)
@Injectable()
export class comboPersisteceAdapter
  extends Repository<ingredienteEntity>
  implements comboRepository
{

async getAllCombo(): Promise<any[]> {
  const comboRepository = getRepository(comboEntity);
  const combos = await comboRepository.find({ relations: ['pdt_cb', 'pdt_cb.producto'] });

  return combos.map((combo) => ({
    combo_id: combo.combo_id,
    nombre_combo: combo.nombre_combo,
    tiempo_aprox_preparacion_combo: combo.tiempo_aprox_preparacion_combo,
    precio_unitario_combo: combo.precio_unitario_combo,
    productos: combo.pdt_cb.map((pdt_cb) => ({
      producto: pdt_cb.producto,
      cantidad_pdt_cb: pdt_cb.cantidad_pdt_cb
    }))
  }));
}


    async getOneIngrediente(_ingredienteEntity: ingredienteEntity,): Promise<ingredienteEntity> {
    const ingredienteRepository = getRepository(ingredienteEntity);
    const ingrediente: ingredienteEntity = await ingredienteRepository.findOne(_ingredienteEntity);
    return ingrediente;
  }

  async createCombo(createComboDto: createComboDto): Promise<any> {
    console.log(createComboDto);
    const comboRepository = getRepository(comboEntity);
    const pdtCbRepository = getRepository(pdt_cbEntity);

    // Crear un nuevo combo y guardar la información excepto los productos
    const combo = new comboEntity();
    combo.combo_id = new UniqueId().getId();
    combo.nombre_combo = createComboDto.nombre;
    combo.tiempo_aprox_preparacion_combo = createComboDto.tiempo_aprox;
    combo.precio_unitario_combo = createComboDto.precio_unitario;
    await comboRepository.save(combo);

    // Crear y guardar la información de cada producto y su relación con el combo
    for (const createProducto of createComboDto.producto) {
      const producto = new pdt_cbEntity();
      producto.pdt_cd_id = new UniqueId().getId()
      producto.cantidad_pdt_cb = createProducto.cantidad.toString();
      producto.producto_id = createProducto.id;
      producto.combo_id = combo.combo_id;

      await pdtCbRepository.save(producto);
    }
   
   
    let messageDelete: string = 'Se guardo correctamente';

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


  
  async deleteCombo(deleteComboDto: createComboDto): Promise<any> {
    const comboRepository = getRepository(comboEntity);
    
    await comboRepository.delete(deleteComboDto.id);
    let messageDelete: string = 'Eiminación realizada';

    return messageDelete;
  }
}
