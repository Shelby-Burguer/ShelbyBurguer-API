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
    return ingre;
  }

  public toDalEntity(ingrediente: ingrediente): ingredienteEntity {
    const ingreEntity = new ingredienteEntity();
    ingreEntity.ingrediente_id = ingrediente.id.getId();
    ingreEntity.nombre_ingrediente = ingrediente.nombre.getString();
    ingreEntity.unidad_ingrediente = ingrediente.unidad.getString();

    return ingreEntity;
  }

  public toDto(dto: ingrediente): readIngredienteDto {
    const ingredienteDto = new readIngredienteDto();
    ingredienteDto.id = dto.id.getId();
    ingredienteDto.nombre = dto.nombre.getString();
    ingredienteDto.unidad = dto.unidad.getString();
    return ingredienteDto;
  }

  public toDomainFromDto(dto: createIngredienteDto): ingrediente {
    const _ingrediente = new ingrediente();
    _ingrediente.id = idVo.create(new UniqueId().getId());
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

}