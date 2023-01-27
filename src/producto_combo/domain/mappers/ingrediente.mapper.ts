import { DataMapper } from '../../../shared/domain/data-mapper.interface';
import { ingrediente } from '../models/ingrediente';
import { collectionEntity } from '../../infrestructure/orm/collection.orm';
import idVo from '../../../shared/domain/Vo/id.vo';
import stringVo from '../../../shared/domain/Vo/string.vo';
import { Injectable } from '@nestjs/common';
import { readIngredienteDto } from '../../application/dto/readingrediente.dto';
import { createCollectionDto } from '../../application/dto/collection.create.dto';
import UniqueId from '../../../shared/domain/UniqueUUID';
import { idCollectionDto } from '../../application/dto/idCollection.dto';
import { updateCollectionDto } from '../../application/dto/updateCollection.dto';
import { readcreateCollectionDto } from '../../application/dto/createReadCollection.dto';

Injectable();
export class ingredienteDataMapper
  implements DataMapper<ingrediente, collectionEntity>
{
/*  public toDomain(entity: collectionEntity): collection {
    const coll = new collection();
    coll.id = idVo.create(entity.collection_id);
    coll.name = stringVo.create(entity.collection_name);

    return coll;
  }

  public toDalEntity(collection: collection): collectionEntity {
    const collEntity = new collectionEntity();
    collEntity.collection_id = collection.id.getId();
    collEntity.collection_name = collection.name.getString();

    return collEntity;
  }
*/
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
