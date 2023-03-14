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
export class productoDataMapper
{
  public toDomain(entity: ingredienteEntity): ingrediente {
    const ingre = new ingrediente();
    ingre.id = idVo.create(entity.ingrediente_id);
    ingre.nombre = stringVo.create(entity.nombre_ingrediente);
    ingre.unidad = stringVo.create(entity.unidad_ingrediente);
    ingre.nombreImagen = entity.nombre_imagen
    ingre.datosImagen = entity.datos_imagen;
    return ingre;
  }

  public toDalEntityp(producto: createProductoDto): productoEntity {
    const _productoEntity = new productoEntity();

    if (producto.id){
      _productoEntity.producto_id = producto.id
    }else{
      _productoEntity.producto_id =  idVo.create(new UniqueId().getId()).getId();
    };

    if (producto.nombre){
      _productoEntity.nombre_producto = producto.nombre
    }
    
    if (producto.tipo){
      _productoEntity.tipo_producto = producto.tipo
    }

    if (producto.tipo){
      _productoEntity.costo_producto = producto.costo
    }

    if (producto.tipo){
      _productoEntity.nombre_imagen = producto.imagen
    }

    console.log('Llegue a producto',_productoEntity)

    return _productoEntity;
  }

  

}