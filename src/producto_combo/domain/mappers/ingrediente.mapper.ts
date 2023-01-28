import { DataMapper } from '../../../shared/domain/data-mapper.interface';
import { ingrediente } from '../models/ingrediente';
import { ingredienteEntity } from '../../infraestructure/orm/ingrediente.orm';
import idVo from '../../../shared/domain/vo/id';
import stringVo from '../../../shared/domain/vo/string';
import { Injectable } from '@nestjs/common';
import { readIngredienteDto } from '../../application/dto/readingrediente.dto';
//import { createCollectionDto } from '../../application/dto/collection.create.dto';
import UniqueId from '../../../shared/domain/UniqueUUID';
//import { idCollectionDto } from '../../application/dto/idCollection.dto';
//mport { updateCollectionDto } from '../../application/dto/updateCollection.dto';
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
/*
  public toDomainFromDto(dto: createCollectionDto): collection {
    const coll = new collection();
    coll.id = idVo.create(new UniqueId().getId());
    coll.name = stringVo.create(dto.name);

    return coll;
  }

  public updateDtotoDomain(
    idCollections: idCollectionDto,
    namecollection: updateCollectionDto,
  ): collection {
    const coll = new collection();
    coll.id = idVo.create(idCollections.id);
    coll.name = stringVo.create(namecollection.company_name);
    return coll;
  }

    public createtoDomainFromDto(dto: readcreateCollectionDto): collection {
    const coll = new collection();
    coll.id = idVo.create(dto.id);
    coll.name = stringVo.create(dto.name);

    return coll;
  }*/
}
