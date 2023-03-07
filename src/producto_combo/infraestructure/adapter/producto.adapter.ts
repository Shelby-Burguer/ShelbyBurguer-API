import { Repository } from 'typeorm';
import { ingredienteEntity } from '../orm/ingrediente.orm';
import { iProductoRepository } from '../../application/repository/producto.repository';
import { productoEntity } from '../orm/producto.orm';
import { InjectRepository } from '@nestjs/typeorm';

export class productoPersisteceAdapter implements iProductoRepository {
  constructor(
    @InjectRepository(ingredienteEntity)
    private readonly ingredienteRepository: Repository<ingredienteEntity>,
    @InjectRepository(productoEntity)
    private readonly productoRepository: Repository<productoEntity>,
  ) {}
  async getAllProducto(): Promise<productoEntity[]> {
    const producto: productoEntity[] = await this.productoRepository.find();
    return producto;
  }

  async getOneIngrediente(
    _ingredienteEntity: ingredienteEntity,
  ): Promise<ingredienteEntity> {
    const ingrediente: ingredienteEntity =
      await this.ingredienteRepository.findOne({
        where: { ingrediente_id: _ingredienteEntity.ingrediente_id },
      });
    return ingrediente;
  }

  async createProducto(
    _productoEntity: productoEntity,
  ): Promise<productoEntity> {
    const producto: productoEntity = await this.productoRepository.save({
      producto_id: _productoEntity.producto_id,
      nombre_producto: _productoEntity.nombre_producto,
      tipo_producto: _productoEntity.tipo_producto,
      costo_producto: _productoEntity.costo_producto,
      nombre_imagen: _productoEntity.nombre_imagen,
    });

    return producto;
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

  async updateProducto(
    _productoEntity: productoEntity,
  ): Promise<productoEntity> {
    await this.productoRepository.update(_productoEntity.producto_id, {
      nombre_producto: _productoEntity.nombre_producto,
      tipo_producto: _productoEntity.tipo_producto,
      costo_producto: _productoEntity.costo_producto,
    });

    const ingrediente: productoEntity = await this.productoRepository.findOne({
      where: { producto_id: _productoEntity.producto_id },
    });
    return ingrediente;
  }

  async deleteProducto(_productoEntity: productoEntity): Promise<string> {
    console.log(_productoEntity);
    await this.ingredienteRepository.delete(_productoEntity.producto_id);
    const messageDelete = 'Eiminación realizada';

    return messageDelete;
  }
}
