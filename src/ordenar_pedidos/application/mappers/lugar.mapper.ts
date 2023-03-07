import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Lugar } from 'src/ordenar_pedidos/domain/models/lugar';
import { toDTO, toEntity } from 'src/shared/application/dto.mapper';
import { LugarDto } from '../dto/lugar.dto';

@Injectable()
export class LugarMapper {
  public toDomain(dto: LugarDto): Lugar {
    return toEntity(dto, Lugar);
  }

  public toDto(lugar: Lugar): LugarDto {
    return plainToClass(LugarDto, toDTO(lugar));
  }
}
