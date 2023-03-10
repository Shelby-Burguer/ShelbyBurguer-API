import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LugarDto } from 'src/ordenar_pedidos/application/dto/lugar.dto';
import { Lugar } from 'src/ordenar_pedidos/domain/models/lugar';
import { toDTO, toEntity } from 'src/shared/application/dto.mapper';
import { LugarEntity } from '../entities/lugar.entity';

@Injectable()
export default class LugarAdapter {
  public static toDomain(entity: LugarEntity): Lugar {
    return toEntity(entity, Lugar);
  }

  public static toEntity(lugar: Lugar): LugarEntity {
    return toEntity(lugar, LugarEntity);
  }

  public static toDto(entity: LugarEntity): LugarDto {
    return plainToClass(LugarDto, toDTO(entity));
  }
}
