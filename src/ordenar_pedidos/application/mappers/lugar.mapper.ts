import { Injectable } from '@nestjs/common';
import { Lugar } from 'src/ordenar_pedidos/domain/models/lugar';
import { GenericMapper } from '../../../shared/application/generic.mapper';
import { LugarDto } from '../dto/lugar.dto';

@Injectable()
export class LugarMapper extends GenericMapper<LugarDto, Lugar> {
  constructor() {
    super(LugarDto, Lugar);
  }
}
