import { DataMapper } from '../../../shared/domain/data-mapper.interface';
import { ingrediente } from '../models/ingrediente';
import { ingredienteEntity } from '../../infraestructure/orm/ingrediente.orm';
import idVo from '../../../shared/domain/vo/id';
import stringVo from '../../../shared/domain/vo/string';
import { Injectable } from '@nestjs/common';
import { readIngredienteDto } from '../../application/dto/readingrediente.dto';
import { createIngredienteDto } from '../../application/dto/createIngrediente.dto';
import UniqueId from '../../../shared/domain/UniqueUUID';
import { idIngredienteDto } from '../../application/dto/idIngrediente.dto';
import { updateIngredientelDto } from '../../application/dto/updateIngrediente.dto';
import { idIngrediente } from '../models/idIngrediente';
import { responseDeleteIngredienteDto } from '../../application/dto/responseDelete.dto';
import { createImagenIngredienteDto } from '../../application/dto/createImagenIngrediente.dto';
import { createProductoDto } from '../../application/dto/createProducto.dto';
import { productoEntity } from '../../infraestructure/orm/producto.orm';
import { createIgdtPdtDto } from 'src/producto_combo/application/dto/createIgdtPdt.dto';
import { igdt_pdtEntity } from '../../infraestructure/orm/igdt_pdt.orm';
import { ingredienteDataMapper } from './ingrediente.mapper';
import { productoDataMapper } from './producto.mapper';

Injectable();
export class igdtPdtDataMapper
{

  constructor(
    private readonly _mapperIngrediente: ingredienteDataMapper,
        private readonly _mapperProducto: productoDataMapper,
  ) {}

  public toDomain(entity: ingredienteEntity): ingrediente {
    const ingre = new ingrediente();
    ingre.id = idVo.create(entity.ingrediente_id);
    ingre.nombre = stringVo.create(entity.nombre_ingrediente);
    ingre.unidad = stringVo.create(entity.unidad_ingrediente);
    ingre.nombreImagen = entity.nombre_imagen
    ingre.datosImagen = entity.datos_imagen;
    return ingre;
  }

  public toDalEntity(igdtPdt: createIgdtPdtDto): igdt_pdtEntity {
    const _igdtPdtEntity = new igdt_pdtEntity();
    
    _igdtPdtEntity.igdt_pdt_id =  idVo.create(new UniqueId().getId()).getId();
    _igdtPdtEntity.cantidad_igdt_pdt = igdtPdt.cantidad
    _igdtPdtEntity.ingrediente_id = igdtPdt.ingrediente_id
    _igdtPdtEntity.producto_id = igdtPdt.producto_id
    const pruebaIngrediente = new ingredienteDataMapper
    const test = igdtPdt.ingrediente?.map((dto: readIngredienteDto) => pruebaIngrediente.toDomainFromDtoigdtPdt(dto))
  
    _igdtPdtEntity.ingrediente = test?.map((domain: ingrediente) => pruebaIngrediente.toDalEntity(domain))
  

    const pruebaProducto = new productoDataMapper
    _igdtPdtEntity.producto = igdtPdt.producto?.map((coll: createProductoDto) => pruebaProducto.toDalEntity(coll))   

    return _igdtPdtEntity;
  }

   /* public toDalEntity(producto: createProductoDto): productoEntity {
    const _productoEntity = new productoEntity();
    _productoEntity.producto_id = producto.id
    _productoEntity.nombre_producto = producto.nombre
    _productoEntity.tipo_producto = producto.tipo
    _productoEntity.costo_producto = producto.costo

    return _productoEntity;
  }*/

    public toDalEntityImagen(imagenIngrediente: createImagenIngredienteDto, idIngrediente: idIngredienteDto,): ingredienteEntity {
    const ingreEntity = new ingredienteEntity();
    ingreEntity.ingrediente_id = idIngrediente.id;
    ingreEntity.nombre_imagen = imagenIngrediente.nombreImagen;
    ingreEntity.datos_imagen = imagenIngrediente.datosImagen;
    return ingreEntity;
  }

  public toDto(_igdtPdt: igdt_pdtEntity): createIgdtPdtDto {
    const igdtPdtDto = new createIgdtPdtDto();
    igdtPdtDto.id =  _igdtPdt.igdt_pdt_id
    igdtPdtDto.cantidad = _igdtPdt.cantidad_igdt_pdt
    igdtPdtDto.ingrediente_id = _igdtPdt.ingrediente_id
    igdtPdtDto.producto_id = _igdtPdt.producto_id
    
    const pruebaIngrediente = new ingredienteDataMapper
    console.log( _igdtPdt.ingrediente)
    const test =  _igdtPdt.ingrediente?.map((coll: ingredienteEntity) => pruebaIngrediente.toDomain(coll))
    
    igdtPdtDto.ingrediente = test?.map((dto: ingrediente) => pruebaIngrediente.toDto(dto))

    const pruebaProducto = new productoDataMapper
    
    igdtPdtDto.producto = _igdtPdt.producto?.map((coll: productoEntity) => pruebaProducto.toDto(coll))
    
    return igdtPdtDto; 
  }

    public toDtoImagen(ingredienteEntity: ingredienteEntity): createImagenIngredienteDto {
    const ingredienteDto = new createImagenIngredienteDto();

    ingredienteDto.nombreImagen = ingredienteEntity.nombre_imagen
    ingredienteDto.datosImagen = ingredienteEntity.datos_imagen
    return ingredienteDto;
  }

  public toDomainFromDto(dto: createIngredienteDto): ingrediente {
    const _ingrediente = new ingrediente();
    _ingrediente.id = idVo.create(new UniqueId().getId());
    _ingrediente.nombre = stringVo.create(dto.nombre);
    _ingrediente.unidad = stringVo.create(dto.unidad);

    return _ingrediente;
  }

  public updateEntity(
    updateProducto: createProductoDto,
    idProducto: createProductoDto,
  ): productoEntity {
    const _producto = new productoEntity();
    _producto.producto_id = idProducto.id
    _producto.nombre_producto = updateProducto.nombre
    _producto.tipo_producto = updateProducto.tipo
    _producto.costo_producto = updateProducto.costo
    return _producto;
  }

  public deletetoDalEntity(producto: createProductoDto): productoEntity {
    const _productoEntity = new productoEntity();
    _productoEntity.producto_id = producto.id;
    return _productoEntity;
  }

  public toIdEntity(_idIngrediente: idIngrediente): ingredienteEntity {
    const ingreEntity = new ingredienteEntity();
    ingreEntity.ingrediente_id = _idIngrediente.id.getId();
    return ingreEntity;
  }

}
