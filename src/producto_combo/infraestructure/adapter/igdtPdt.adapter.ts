import { Repository } from 'typeorm';
import { ingredienteEntity } from '../orm/ingrediente.orm';
import { productoEntity } from '../orm/producto.orm';
import { iIgdtPdtRepository } from 'src/producto_combo/application/repository/igdtPdt.repository';
import { igdt_pdtEntity } from '../orm/igdt_pdt.orm';
import { createIgdtPdtDto } from 'src/producto_combo/application/dto/createIgdtPdt.dto';
import UniqueId from '../../../shared/domain/UniqueUUID';
import { InjectRepository } from '@nestjs/typeorm';

export class igdtPdtPersisteceAdapter implements iIgdtPdtRepository {
  constructor(
    @InjectRepository(igdt_pdtEntity)
    private readonly igdtPdtRepository: Repository<igdt_pdtEntity>,
    @InjectRepository(ingredienteEntity)
    private readonly ingredienteRepository: Repository<ingredienteEntity>,
    @InjectRepository(productoEntity)
    private readonly productoRepository: Repository<productoEntity>,
  ) {}
  async getAllIgdtPdt(): Promise<igdt_pdtEntity[]> {
    const igdtPdt: igdt_pdtEntity[] = await this.igdtPdtRepository.find({
      relations: ['ingrediente', 'producto'],
    });
    return igdtPdt;
  }

  async getAllIgdtPdtid(
    _igdtPdtEntity: igdt_pdtEntity,
  ): Promise<igdt_pdtEntity[]> {
    const igdtPdt: igdt_pdtEntity[] = await this.igdtPdtRepository.find({
      where: { producto_id: _igdtPdtEntity.igdt_pdt_id },
      relations: ['ingrediente', 'producto'],
    });
    return igdtPdt;
  }

  async createIgdtPdt(_igdtPdtEntity: igdt_pdtEntity): Promise<string> {
    console.log(_igdtPdtEntity);
    await this.igdtPdtRepository.save({
      igdt_pdt_id: _igdtPdtEntity.igdt_pdt_id,
      cantidad_igdt_pdt: _igdtPdtEntity.cantidad_igdt_pdt,
      ingrediente_id: _igdtPdtEntity.ingrediente_id,
      producto_id: _igdtPdtEntity.producto_id,
    });
    const messageDelete = 'Eiminación realizada';
    return messageDelete;
  }

  async createImagenIngrediente(
    _ingredienteEntity: ingredienteEntity,
  ): Promise<any> {
    await this.ingredienteRepository.update(_ingredienteEntity.ingrediente_id, {
      nombre_imagen: _ingredienteEntity.nombre_imagen,
      datos_imagen: _ingredienteEntity.datos_imagen,
    });

    const ingrediente: ingredienteEntity =
      await this.ingredienteRepository.findOne({
        where: { ingrediente_id: _ingredienteEntity.ingrediente_id },
      });

    return ingrediente;
  }

  async updateIgdtPdt(
    productId: productoEntity,
    producto: productoEntity,
    igdtPdtArray: createIgdtPdtDto[],
  ) {
    console.log('Producto id adapter', productId.producto_id);
    console.log('Producto id adapter', producto);
    console.log('Producto id igdtPdt', igdtPdtArray);

    await this.productoRepository.update(productId.producto_id, {
      nombre_producto: producto.nombre_producto,
      tipo_producto: producto.tipo_producto,
      costo_producto: producto.costo_producto,
    });

    // find all existing igdt_pdt records for the given product ID
    const existingIgdtPdtRecords = await this.igdtPdtRepository.find({
      where: { producto_id: productId.producto_id },
    });

    // create a map of existing igdt_pdt records by ingrediente_id
    const existingIgdtPdtMap = new Map<string, igdt_pdtEntity>();
    for (const record of existingIgdtPdtRecords) {
      existingIgdtPdtMap.set(record.ingrediente_id, record);
    }

    console.log('Existe', existingIgdtPdtMap);

    // loop through the new igdt_pdt records and update or create them
    for (const igdtPdtTest of igdtPdtArray) {
      const existingRecord = existingIgdtPdtMap.get(igdtPdtTest.id);
      if (existingRecord) {
        // update existing record
        if (existingRecord.igdt_pdt_id === undefined) {
          throw new Error(
            'Existing record does not have igdt_pdt_id assigned.',
          );
        }
        existingRecord.cantidad_igdt_pdt = igdtPdtTest.cantidad;
        await this.igdtPdtRepository.save(existingRecord);
        existingIgdtPdtMap.delete(igdtPdtTest.id);
      } else {
        // create new record
        const recordExists = await this.igdtPdtRepository.findOne({
          where: {
            ingrediente_id: igdtPdtTest.id,
            producto_id: productId.producto_id,
          },
        });

        if (recordExists) {
          // update existing record
          if (recordExists.igdt_pdt_id === undefined) {
            throw new Error(
              'Existing record does not have igdt_pdt_id assigned.',
            );
          }
          recordExists.cantidad_igdt_pdt = igdtPdtTest.cantidad;
          await this.igdtPdtRepository.save(recordExists);
        } else {
          // create new record
          const igdtPdt = this.igdtPdtRepository.create({
            cantidad_igdt_pdt: igdtPdtTest.cantidad,
            ingrediente_id: igdtPdtTest.id,
            producto_id: productId.producto_id,
            igdt_pdt_id: new UniqueId().getId(),
          });
          await this.igdtPdtRepository.save(igdtPdt);
        }
      }
    }

    for (const [ingredienteId, existingRecord] of existingIgdtPdtMap) {
      if (!igdtPdtArray.some((igdtPdt) => igdtPdt.id === ingredienteId)) {
        await this.igdtPdtRepository.delete(existingRecord.igdt_pdt_id);
      }
    }

    const respuesta = 'Se ha actualizado';
    return respuesta;
  }

  async deleteProducto(_productoEntity: productoEntity): Promise<string> {
    console.log(_productoEntity);
    await this.ingredienteRepository.delete(_productoEntity.producto_id);
    const messageDelete = 'Eiminación realizada';

    return messageDelete;
  }
}
