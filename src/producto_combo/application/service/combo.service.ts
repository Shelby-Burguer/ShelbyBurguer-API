import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { productoDataMapper } from '../../domain/mappers/producto.mapper';
import { igdtPdtDataMapper } from '../../domain/mappers/igdtPdt.mapper';
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
