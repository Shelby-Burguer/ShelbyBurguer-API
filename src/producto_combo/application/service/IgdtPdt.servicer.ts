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
import { createIgdtPdtDto } from '../dto/createIgdtPdt.dto';
import { igdtPdtDataMapper } from '../../domain/mappers/igdtPdt.mapper';
import { igdt_pdtEntity } from '../../infraestructure/orm/igdt_pdt.orm';
import { iIgdtPdtRepository } from '../repository/igdtPdt.repository';
import { igdtPdtPersisteceAdapter } from '../../infraestructure/adapter/igdtPdt.adapter';


@Injectable()
export class igdtPdtService {
  constructor(
    @InjectRepository(igdtPdtPersisteceAdapter)
    private readonly _iIgdtPdtRepository: iIgdtPdtRepository,
    private readonly _mapper: igdtPdtDataMapper,
  ) {}

  async getAllIgdtPdt(): Promise<igdt_pdtEntity[]> {
    const igdtPdtEntity =
      await this._iIgdtPdtRepository.getAllIgdtPdt();
    return igdtPdtEntity;
  }

    async getOneIngrediente(id: idIngrediente): Promise<ingrediente> {
    const IngredienteEntity: ingredienteEntity =
      await this._iIgdtPdtRepository.getOneIngrediente(
        this._mapper.toIdEntity(id),
      );
    return this._mapper.toDomain(IngredienteEntity);

  }

  async createIgdtPdt(igdtPdt: createIgdtPdtDto): Promise<igdt_pdtEntity> {
    const createdIngredienteEntity: igdt_pdtEntity =
      await this._iIgdtPdtRepository.createIgdtPdt(
        this._mapper.toDalEntity(igdtPdt),
      );
    return createdIngredienteEntity;
  }

    async createImagenIngrediente(imagenIngrediente: createImagenIngredienteDto, idIngrediente: idIngredienteDto): Promise<any> {
    const createdIngredienteEntity: ingredienteEntity =
      await this._iIgdtPdtRepository.createImagenIngrediente(
        this._mapper.toDalEntityImagen(imagenIngrediente, idIngrediente),
      );
    return createdIngredienteEntity;
  }

  async updateProducto(producto: productoEntity): Promise<productoEntity> {
    const UpdateIngredienteEntity: productoEntity =
      await this._iIgdtPdtRepository.updateProducto(producto);
    return UpdateIngredienteEntity;
  }

  async deleteProducto(producto: createProductoDto): Promise<string> {
    const deleteIngredienteEntity: string =
      await this._iIgdtPdtRepository.deleteProducto(
        this._mapper.deletetoDalEntity(producto),
      );
    return deleteIngredienteEntity;
  }
}