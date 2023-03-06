import { Injectable } from '@nestjs/common';
//import { collectionEntity } from '../orm/collection.orm';
import { iIngredienteRepository } from '../../application/repository/iIngrediente.repository';
import { Repository, EntityRepository, getRepository } from 'typeorm';
import { ingredienteEntity } from '../orm/ingrediente.orm';
import { iProductoRepository } from '../../application/repository/producto.repository';
import { productoEntity } from '../orm/producto.orm';
import { iIgdtPdtRepository } from 'src/producto_combo/application/repository/igdtPdt.repository';
import { igdt_pdtEntity } from '../orm/igdt_pdt.orm';
import { createIgdtPdtDto } from 'src/producto_combo/application/dto/createIgdtPdt.dto';
import UniqueId from '../../../shared/domain/UniqueUUID';

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

async updateIgdtPdt(
  productId: productoEntity ,
  producto: productoEntity ,
  igdtPdtArray: createIgdtPdtDto[],
) {
  console.log('Producto id adapter',productId.producto_id);
  console.log('Producto id adapter',producto);
  console.log('Producto id igdtPdt',igdtPdtArray);

  const productoRepository = getRepository(productoEntity);
  await productoRepository.update(productId.producto_id, {
      nombre_producto: producto.nombre_producto ,
      tipo_producto: producto.tipo_producto,
      costo_producto: producto.costo_producto
    });

  const igdtPdtRepository = getRepository(igdt_pdtEntity);

  // find all existing igdt_pdt records for the given product ID
  const existingIgdtPdtRecords = await igdtPdtRepository.find({
    where: { producto_id: productId.producto_id },
  });

  // create a map of existing igdt_pdt records by ingrediente_id
  const existingIgdtPdtMap = new Map<string, igdt_pdtEntity>();
  for (const record of existingIgdtPdtRecords) {
    existingIgdtPdtMap.set(record.ingrediente_id, record);
  }

  console.log('Existe', existingIgdtPdtMap)


  // loop through the new igdt_pdt records and update or create them
for (const igdtPdtTest of igdtPdtArray) {
  const existingRecord = existingIgdtPdtMap.get(igdtPdtTest.id);
  if (existingRecord) {
    // update existing record
    if (existingRecord.igdt_pdt_id === undefined) {
      throw new Error('Existing record does not have igdt_pdt_id assigned.');
    }
    existingRecord.cantidad_igdt_pdt = igdtPdtTest.cantidad;
    await igdtPdtRepository.save(existingRecord);
    existingIgdtPdtMap.delete(igdtPdtTest.id);
  } else {
    // create new record
    const recordExists = await igdtPdtRepository.findOne({
      where: { ingrediente_id: igdtPdtTest.id, producto_id: productId.producto_id },
    });

    if (recordExists) {
      // update existing record
      if (recordExists.igdt_pdt_id === undefined) {
        throw new Error('Existing record does not have igdt_pdt_id assigned.');
      }
      recordExists.cantidad_igdt_pdt = igdtPdtTest.cantidad;
      await igdtPdtRepository.save(recordExists);
    } else {
      // create new record
      const igdtPdt = igdtPdtRepository.create({
        cantidad_igdt_pdt: igdtPdtTest.cantidad,
        ingrediente_id: igdtPdtTest.id,
        producto_id: productId.producto_id,
        igdt_pdt_id: new UniqueId().getId(),
      });
      await igdtPdtRepository.save(igdtPdt);
    }
  }
}

for (const [ingredienteId, existingRecord] of existingIgdtPdtMap) {
  if (!igdtPdtArray.some((igdtPdt) => igdtPdt.id === ingredienteId)) {
    await igdtPdtRepository.delete(existingRecord.igdt_pdt_id);
  }
}

    let respuesta = 'Se ha actualizado';
    return respuesta
}

  async deleteProducto(_productoEntity: productoEntity): Promise<string> {
    const ingredienteRepository = getRepository(productoEntity);
    console.log(_productoEntity);
    await ingredienteRepository.delete(_productoEntity.producto_id);
    let messageDelete: string = 'Eiminación realizada';

    return messageDelete;
  }
}
