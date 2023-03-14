import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, getRepository } from 'typeorm';
import { pdt_cbEntity } from '../../../producto_combo/infraestructure/orm/pdt_cb.orm';
import { InjectRepository } from '@nestjs/typeorm';
import { iOrdenRepository } from '../repositories/orden.repository';
import { createOrdenIdDto } from 'src/ordenar_pedidos/application/dto/createOrdenId.dto';
import { OrdenEntity } from '../entities/orden.orm';
import UniqueId from 'src/shared/domain/UniqueUUID';

@Injectable()
export class ordenPersisteceAdapter implements iOrdenRepository {
  constructor(
    @InjectRepository(OrdenEntity)
    private readonly ordenRepository: Repository<OrdenEntity>,
  ) {}

  async createOrdenId(): Promise<any> {
    const orden = new OrdenEntity();
    orden.orden_id = new UniqueId().getId();
    await this.ordenRepository.save(orden);

    return {orden_id: orden.orden_id};
  }
}
