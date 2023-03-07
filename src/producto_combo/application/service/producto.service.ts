import { Injectable } from '@nestjs/common';
import { ingrediente } from '../../domain/models/ingrediente';
import { idIngrediente } from '../../domain/models/idIngrediente';
import { InjectRepository } from '@nestjs/typeorm';
import { ingredienteEntity } from '../../infraestructure/orm/ingrediente.orm';
import { idIngredienteDto } from '../../application/dto/idIngrediente.dto';
import { createImagenIngredienteDto } from '../dto/createImagenIngrediente.dto';
import { createProductoDto } from '../dto/createProducto.dto';
import { iProductoRepository } from '../repository/producto.repository';
import { productoEntity } from '../../infraestructure/orm/producto.orm';
import { productoDataMapper } from '../../domain/mappers/producto.mapper';
import { productoPersisteceAdapter } from '../../infraestructure/adapter/producto.adapter';

@Injectable()
export class productoService {
  constructor(
    @InjectRepository(productoPersisteceAdapter)
    private readonly _iProductoRepository: iProductoRepository,
    private readonly _mapper: productoDataMapper,
  ) {}

  async getAllProducto(): Promise<productoEntity[]> {
    const productoEntity = await this._iProductoRepository.getAllProducto();
    return productoEntity;
  }

  async getOneIngrediente(id: idIngrediente): Promise<ingrediente> {
    const IngredienteEntity: ingredienteEntity =
      await this._iProductoRepository.getOneIngrediente(
        this._mapper.toIdEntity(id),
      );
    return this._mapper.toDomain(IngredienteEntity);
  }

  async createProducto(producto: createProductoDto): Promise<productoEntity> {
    const createdIngredienteEntity: productoEntity =
      await this._iProductoRepository.createProducto(
        this._mapper.toDalEntityp(producto),
      );
    return createdIngredienteEntity;
  }

  async createImagenIngrediente(
    imagenIngrediente: createImagenIngredienteDto,
    idIngrediente: idIngredienteDto,
  ): Promise<any> {
    const createdIngredienteEntity: ingredienteEntity =
      await this._iProductoRepository.createImagenIngrediente(
        this._mapper.toDalEntityImagen(imagenIngrediente, idIngrediente),
      );
    return createdIngredienteEntity;
  }

  async updateProducto(producto: productoEntity): Promise<productoEntity> {
    const UpdateIngredienteEntity: productoEntity =
      await this._iProductoRepository.updateProducto(producto);
    return UpdateIngredienteEntity;
  }

  async deleteProducto(producto: createProductoDto): Promise<string> {
    const deleteIngredienteEntity: string =
      await this._iProductoRepository.deleteProducto(
        this._mapper.deletetoDalEntity(producto),
      );
    return deleteIngredienteEntity;
  }
}
