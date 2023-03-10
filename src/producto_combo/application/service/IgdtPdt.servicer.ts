import { Inject, Injectable } from '@nestjs/common';
import { ingredienteEntity } from '../../infraestructure/orm/ingrediente.orm';
import { idIngredienteDto } from '../../application/dto/idIngrediente.dto';
import { createImagenIngredienteDto } from '../dto/createImagenIngrediente.dto';
import { createProductoDto } from '../dto/createProducto.dto';
import { productoDataMapper } from '../../domain/mappers/producto.mapper';
import { createIgdtPdtDto } from '../dto/createIgdtPdt.dto';
import { igdtPdtDataMapper } from '../../domain/mappers/igdtPdt.mapper';
import { igdt_pdtEntity } from '../../infraestructure/orm/igdt_pdt.orm';
import { iIgdtPdtRepository } from '../repository/igdtPdt.repository';
import { updateIgdtPdtDto } from '../dto/updateIgftPdt.dto';

@Injectable()
export class igdtPdtService {
  constructor(
    @Inject('iIgdtPdtRepository')
    private readonly _iIgdtPdtRepository: iIgdtPdtRepository,
    private readonly _mapper: igdtPdtDataMapper,
    private readonly _mapperP: productoDataMapper,
  ) {}

  async getAllIgdtPdt(): Promise<igdt_pdtEntity[]> {
    const igdtPdtEntity = await this._iIgdtPdtRepository.getAllIgdtPdt();
    return igdtPdtEntity;
  }

  async getAllIgdtPdtid(id: createIgdtPdtDto): Promise<igdt_pdtEntity[]> {
    const igdtPdtEntity: igdt_pdtEntity[] =
      await this._iIgdtPdtRepository.getAllIgdtPdtid(
        this._mapper.toDalEntitytest(id),
      );
    // TODO: No hace nada esta parte
    // const res: createIgdtPdtDto[] = igdtPdtEntity.map((data: igdt_pdtEntity) =>
    //   this._mapper.toDto(data),
    // );
    return igdtPdtEntity;
  }

  async createIgdtPdt(igdtPdt: createIgdtPdtDto[]): Promise<string> {
    const prueba = igdtPdt.map((test: createIgdtPdtDto) =>
      this._mapper.toDalEntity(test),
    );
    const createdIngredienteEntity = prueba.map(
      async (test: igdt_pdtEntity) =>
        await this._iIgdtPdtRepository.createIgdtPdt(test),
    );

    let res: string;
    createdIngredienteEntity[0].then((dato) => (res = dato));
    return res;
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

  async updateIgdtPdt(
    productId: createProductoDto,
    igdtPdtArray: updateIgdtPdtDto,
  ) {
    /*const _igdtPdtArray = igdtPdtArray.updateIgdtPdt.map((test: createIgdtPdtDto) =>
      this._mapper.toDalEntity(igdtPdtArray.producto),
    );

    const _igdtPdtArray = this._mapper.toDalEntity(igdtPdtArray.updateIgdtPdt);*/

    const _producto = this._mapperP.toDalEntity(igdtPdtArray.producto);

    const _productId = this._mapperP.toDalEntityp(productId);
    console.log('Service _productId', _productId);

    this._iIgdtPdtRepository.updateIgdtPdt(
      _productId,
      _producto,
      igdtPdtArray.updateIgdtPdt,
    );
  }

  async deleteProducto(producto: createProductoDto): Promise<string> {
    const deleteIngredienteEntity: string =
      await this._iIgdtPdtRepository.deleteProducto(
        this._mapper.deletetoDalEntity(producto),
      );
    return deleteIngredienteEntity;
  }
}
