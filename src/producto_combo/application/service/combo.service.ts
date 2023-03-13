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
import { updateIgdtPdtDto } from '../dto/updateIgftPdt.dto';
import { comboPersisteceAdapter } from '../../infraestructure/adapter/combo.adapter';
import { icomboRepository } from '../repository/combo.repository';
import { createComboDto } from '../dto/createCombo.dto';

@Injectable()
export class comboService {
  constructor(
    @Inject('icomboRepository')
    private readonly iCombo: icomboRepository,
    private readonly _mapper: igdtPdtDataMapper,
    private readonly _mapperP: productoDataMapper,
  ) {}

  async getAllCombo(): Promise<any[]> {
    const combos = await this.iCombo.getAllCombo();
    return combos
   
  }

  async createCombo(combo: createComboDto): Promise<any> {
  const combos = await this.iCombo.createCombo(combo);
  return combos;
/*
    const prueba = igdtPdt.map((test: createIgdtPdtDto) =>
      this._mapper.toDalEntity(test),
    );
    const createdIngredienteEntity = await prueba.map((test: igdt_pdtEntity) =>
      this._iIgdtPdtRepository.createIgdtPdt(test),
    );

    let res: string;
    createdIngredienteEntity[0].then((dato) => (res = dato));
    return res;*/
  }

  async deleteCombo(combo: createComboDto): Promise<any> {
  const combos = await this.iCombo.deleteCombo(combo);
  return combos;
  }

/*
  async getAllIgdtPdtid(id: createIgdtPdtDto): Promise<igdt_pdtEntity[]> {
    const igdtPdtEntity: igdt_pdtEntity[] =
      await this._iIgdtPdtRepository.getAllIgdtPdtid(
        this._mapper.toDalEntitytest(id),
      );
    const res: createIgdtPdtDto[] = igdtPdtEntity.map((data: igdt_pdtEntity) =>
      this._mapper.toDto(data),
    );
    return igdtPdtEntity;
  }



  async createImagenIngrediente(
    imagenIngrediente: createImagenIngredienteDto,
    idIngrediente: idIngredienteDto,
  ): Promise<any> {
    const createdIngredienteEntity: ingredienteEntity =
      await this._iIgdtPdtRepository.createImagenIngrediente(
        this._mapper.toDalEntityImagen(imagenIngrediente, idIngrediente),
      );
    return createdIngredienteEntity;
  }

  async updateIgdtPdt(productId: createProductoDto,  igdtPdtArray:updateIgdtPdtDto) {
  
    const _igdtPdtArray = igdtPdtArray.updateIgdtPdt.map((test: createIgdtPdtDto) =>
      this._mapper.toDalEntity(igdtPdtArray.producto),
    );

    const _igdtPdtArray = this._mapper.toDalEntity(igdtPdtArray.updateIgdtPdt);


    const _producto = this._mapperP.toDalEntity(igdtPdtArray.producto);
  




   const _productId = this._mapperP.toDalEntityp(productId)
  console.log('Service _productId', _productId);

    const createdIngredienteEntity = this._iIgdtPdtRepository.updateIgdtPdt(_productId, _producto, igdtPdtArray.updateIgdtPdt);


  }

  async deleteProducto(producto: createProductoDto): Promise<string> {
    const deleteIngredienteEntity: string =
      await this._iIgdtPdtRepository.deleteProducto(
        this._mapper.deletetoDalEntity(producto),
      );
    return deleteIngredienteEntity;
  }*/

}
