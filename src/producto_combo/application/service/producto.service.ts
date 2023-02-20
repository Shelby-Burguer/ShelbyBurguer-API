import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ingrediente } from '../../domain/models/ingrediente';
import { idIngrediente } from '../../domain/models/idIngrediente';
import { forwardRef } from '@nestjs/common';
import { ingredienteDataMapper } from '../../domain/mappers/ingrediente.mapper';
import { ingredientePersisteceAdapter } from '../../infraestructure/adapter/ingrediente.adapter';
import { InjectRepository } from '@nestjs/typeorm';
import { iIngredienteRepository } from '../repository/iIngrediente.repository';
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

  async getAllIngrediente(): Promise<ingrediente[]> {
    const ingredienteEntity =
      await this._iProductoRepository.getAllIngrediente();
    return ingredienteEntity.map((ingrediente: ingredienteEntity) =>
      this._mapper.toDomain(ingrediente),
    );
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
    console.log('que te pasa baby', createdIngredienteEntity)
    return createdIngredienteEntity;
  }

    async createImagenIngrediente(imagenIngrediente: createImagenIngredienteDto, idIngrediente: idIngredienteDto): Promise<any> {
    const createdIngredienteEntity: ingredienteEntity =
      await this._iProductoRepository.createImagenIngrediente(
        this._mapper.toDalEntityImagen(imagenIngrediente, idIngrediente),
      );
    return createdIngredienteEntity;
  }

  async updateingrediente(ingrediente: ingrediente): Promise<ingrediente> {
    const UpdateIngredienteEntity: ingredienteEntity =
      await this._iProductoRepository.updateIngrediente(
        this._mapper.toDalEntity(ingrediente),
      );
    return this._mapper.toDomain(UpdateIngredienteEntity);
  }

  async deleteIngrediente(ingrediente: idIngrediente): Promise<string> {
    const deleteIngredienteEntity: string =
      await this._iProductoRepository.deleteIngrediente(
        this._mapper.deletetoDalEntity(ingrediente),
      );
    return deleteIngredienteEntity;
  }
}