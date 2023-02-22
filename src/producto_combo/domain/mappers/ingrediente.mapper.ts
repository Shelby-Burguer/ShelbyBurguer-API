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

//import { readcreateCollectionDto } from '../../application/dto/createReadCollection.dto';

Injectable();
export class ingredienteDataMapper
  implements DataMapper<ingrediente, ingredienteEntity>
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

  public toDalEntity(ingrediente: ingrediente): ingredienteEntity {
    const ingreEntity = new ingredienteEntity();
    ingreEntity.ingrediente_id = ingrediente.id.getId();
    ingreEntity.nombre_ingrediente = ingrediente.nombre.getString();
    ingreEntity.unidad_ingrediente = ingrediente.unidad.getString();

    return ingreEntity;
  }

    public toDalEntityImagen(imagenIngrediente: createImagenIngredienteDto, idIngrediente: idIngredienteDto,): ingredienteEntity {
    const ingreEntity = new ingredienteEntity();
    ingreEntity.ingrediente_id = idIngrediente.id;
    ingreEntity.nombre_imagen = imagenIngrediente.nombreImagen;
    ingreEntity.datos_imagen = imagenIngrediente.datosImagen;
    return ingreEntity;
  }

  public toDto(dto: ingrediente): readIngredienteDto {
    const ingredienteDto = new readIngredienteDto();
    ingredienteDto.id = dto.id.getId();
    ingredienteDto.nombre = dto.nombre.getString();
    ingredienteDto.unidad = dto.unidad.getString();
    ingredienteDto.nombreImagen = dto.nombreImagen;
    ingredienteDto.datosImagen = dto.datosImagen;

    return ingredienteDto; 
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

    public toDomainFromDtoigdtPdt(dto: readIngredienteDto): ingrediente {
    const _ingrediente = new ingrediente();
    _ingrediente.id = idVo.create(dto.id);
    _ingrediente.nombre = stringVo.create(dto.nombre);
    _ingrediente.unidad = stringVo.create(dto.unidad);

    return _ingrediente;
  }

  public updateDtotoDomain(
    idIngrediente: idIngredienteDto,
    updateIngrediente: updateIngredientelDto,
  ): ingrediente {
    const _ingrediente = new ingrediente();
    _ingrediente.id = idVo.create(idIngrediente.id);
    _ingrediente.nombre = stringVo.create(updateIngrediente.nombre);
    _ingrediente.unidad = stringVo.create(updateIngrediente.unidad);
    return _ingrediente;
  }

  public deleteDtotoDomain(
    idIngredienteDto: idIngredienteDto): idIngrediente {
    const _idIngreidiente = new idIngrediente()
    _idIngreidiente.id = idVo.create(idIngredienteDto.id);
    return _idIngreidiente;
  }

  public deletetoDalEntity(ingrediente: idIngrediente): ingredienteEntity {
    const _ingredienteEntity = new ingredienteEntity();
    _ingredienteEntity.ingrediente_id = ingrediente.id.getId();
    return _ingredienteEntity;
  }
  public todeleteDto(ingrediente: string): responseDeleteIngredienteDto {
    const _ingredientedto = new responseDeleteIngredienteDto();
    _ingredientedto.responseDelete = ingrediente;
    return _ingredientedto;
  }

  public toIdEntity(_idIngrediente: idIngrediente): ingredienteEntity {
    const ingreEntity = new ingredienteEntity();
    ingreEntity.ingrediente_id = _idIngrediente.id.getId();
    return ingreEntity;
  }

  public toDomainFromDtoid(dto: idIngredienteDto): ingrediente {
    const _ingrediente = new ingrediente();
    _ingrediente.id = idVo.create(dto.id);
    return _ingrediente;
  }

    public toDtoId(dto: ingrediente): readIngredienteDto {
    const ingredienteDto = new readIngredienteDto();
    ingredienteDto.id = dto.id.getId();
    ingredienteDto.nombre = dto.nombre.getString();
    ingredienteDto.unidad = dto.unidad.getString();
    return ingredienteDto;
  }

}
