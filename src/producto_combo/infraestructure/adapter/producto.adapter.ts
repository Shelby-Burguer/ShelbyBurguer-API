import { Repository } from 'typeorm';
import { ingredienteEntity } from '../orm/ingrediente.orm';
import { iProductoRepository } from '../../application/repository/producto.repository';
import { productoEntity } from '../orm/producto.orm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, InternalServerErrorException } from '@nestjs/common';

export class productoPersisteceAdapter implements iProductoRepository {
  constructor(
    @InjectRepository(ingredienteEntity)
    private readonly ingredienteRepository: Repository<ingredienteEntity>,
    @InjectRepository(productoEntity)
    private readonly productoRepository: Repository<productoEntity>,
  ) {}
  async getAllProducto(): Promise<productoEntity[]> {
  try {
    const producto: productoEntity[] = await this.productoRepository.find();
    return producto;
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    } else {
      throw new InternalServerErrorException();
    }
  }
  }

  async getOneIngrediente(
    _ingredienteEntity: ingredienteEntity,
  ): Promise<ingredienteEntity> {
    try {
    const ingrediente: ingredienteEntity =
      await this.ingredienteRepository.findOne({
        where: { ingrediente_id: _ingredienteEntity.ingrediente_id },
      });
    return ingrediente;
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    } else {
      throw new InternalServerErrorException();
    }
  }
  }

  async createProducto(
    _productoEntity: productoEntity,
  ): Promise<productoEntity> {
  try {
  console.log('Test _productoEntity.tamano_producto', _productoEntity.tamano_producto);
    const producto: productoEntity = await this.productoRepository.save({
      producto_id: _productoEntity.producto_id,
      nombre_producto: _productoEntity.nombre_producto,
      tipo_producto: _productoEntity.tipo_producto,
      costo_producto: _productoEntity.costo_producto,
      nombre_imagen: _productoEntity.nombre_imagen,
      tamano_producto: _productoEntity.tamano_producto
    });

    return producto;
    } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    } else {
      throw new InternalServerErrorException();
    }
  }
  }

  async createImagenIngrediente(
    _ingredienteEntity: ingredienteEntity,
  ): Promise<any> {
   try {
    await this.ingredienteRepository.update(_ingredienteEntity.ingrediente_id, {
      nombre_imagen: _ingredienteEntity.nombre_imagen,
      datos_imagen: _ingredienteEntity.datos_imagen,
    });

    const ingrediente: ingredienteEntity =
      await this.ingredienteRepository.findOne({
        where: { ingrediente_id: _ingredienteEntity.ingrediente_id },
      });

    return ingrediente;
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    } else {
      throw new InternalServerErrorException();
    }
  }
  }

  async updateProducto(
    _productoEntity: productoEntity,
  ): Promise<productoEntity> {
  try {
    await this.productoRepository.update(_productoEntity.producto_id, {
      nombre_producto: _productoEntity.nombre_producto,
      tipo_producto: _productoEntity.tipo_producto,
      costo_producto: _productoEntity.costo_producto,
    });

    const ingrediente: productoEntity = await this.productoRepository.findOne({
      where: { producto_id: _productoEntity.producto_id },
    });
    return ingrediente;
    } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    } else {
      throw new InternalServerErrorException();
    }
  }
  }

  async deleteProducto(_productoEntity: productoEntity): Promise<string> {
  try {
    await this.productoRepository.delete(_productoEntity.producto_id);
    const messageDelete = 'Eiminación realizada';

    return messageDelete;
    }
       catch (error) {
    if (error instanceof HttpException) {
      throw error;
    } else {
      throw new InternalServerErrorException();
    }
    }
  }
}
