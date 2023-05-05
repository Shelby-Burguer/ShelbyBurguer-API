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

Injectable();
export class productoDataMapper {
  public toDomain(entity: ingredienteEntity): ingrediente {
    const ingre = new ingrediente();
    ingre.id = idVo.create(entity.ingrediente_id);
    ingre.nombre = stringVo.create(entity.nombre_ingrediente);
    ingre.unidad = stringVo.create(entity.unidad_ingrediente);
    ingre.nombreImagen = entity.nombre_imagen;
    ingre.datosImagen = entity.datos_imagen;
    return ingre;
  }

  public toDalEntityp(producto: createProductoDto): productoEntity {
    const _productoEntity = new productoEntity();
    console.log('producto.tamano_producto', producto.tamano_producto);
    if (producto.id) {
      _productoEntity.producto_id = producto.id;
    } else {
      _productoEntity.producto_id = idVo.create(new UniqueId().getId()).getId();
    }

    if (producto.nombre) {
      _productoEntity.nombre_producto = producto.nombre;
    }

    if (producto.tipo) {
      _productoEntity.tipo_producto = producto.tipo;
    }

    if (producto.costo) {
      _productoEntity.costo_producto = producto.costo;
    }

    if (producto.tipo) {
      _productoEntity.nombre_imagen = producto.imagen;
    }

    if (producto.tamano_producto) {
      _productoEntity.tamano_producto = producto.tamano_producto;
    }

    console.log('Llegue a producto', _productoEntity);

    return _productoEntity;
  }

  public toDalEntity(producto: createProductoDto): productoEntity {
    const _productoEntity = new productoEntity();
    _productoEntity.producto_id = producto.id;
    _productoEntity.nombre_producto = producto.nombre;
    _productoEntity.tipo_producto = producto.tipo;
    _productoEntity.costo_producto = producto.costo;
    _productoEntity.nombre_imagen = producto.imagen;
    return _productoEntity;
  }

  public toDalEntityImagen(
    imagenIngrediente: createImagenIngredienteDto,
    idIngrediente: idIngredienteDto,
  ): ingredienteEntity {
    const ingreEntity = new ingredienteEntity();
    ingreEntity.ingrediente_id = idIngrediente.id;
    ingreEntity.nombre_imagen = imagenIngrediente.nombreImagen;
    ingreEntity.datos_imagen = imagenIngrediente.datosImagen;
    return ingreEntity;
  }

  public toDto(_producto: productoEntity): createProductoDto {
    const productoDto = new createProductoDto();
    productoDto.id = _producto.producto_id;
    productoDto.nombre = _producto.nombre_producto;
    productoDto.tipo = _producto.tipo_producto;
    productoDto.costo = _producto.costo_producto;
    productoDto.imagen = _producto.nombre_imagen
    productoDto.tamano_producto = _producto.tamano_producto;

    console.log('TestgetAllProductonew', productoDto);
    return productoDto;
  }

  public toDtoImagen(
    ingredienteEntity: ingredienteEntity,
  ): createImagenIngredienteDto {
    const ingredienteDto = new createImagenIngredienteDto();

    ingredienteDto.nombreImagen = ingredienteEntity.nombre_imagen;
    ingredienteDto.datosImagen = ingredienteEntity.datos_imagen;
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
    _producto.producto_id = idProducto.id;
    _producto.nombre_producto = updateProducto.nombre;
    _producto.tipo_producto = updateProducto.tipo;
    _producto.costo_producto = updateProducto.costo;
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
