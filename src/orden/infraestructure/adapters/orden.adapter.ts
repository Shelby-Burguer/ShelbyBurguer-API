import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { iOrdenRepository } from '../repositories/orden.repository';
import { createOrdenIdDto } from '../../application/dto/createOrdenId.dto';
import { OrdenEntity } from '../entities/orden.orm';
import UniqueId from '../../../shared/domain/UniqueUUID';
import { pdtcb_odEntity } from '../entities/pdtcb_od.orm';

@Injectable()
export class ordenPersisteceAdapter implements iOrdenRepository {
  constructor(
    @InjectRepository(OrdenEntity)
    private readonly ordenRepository: Repository<OrdenEntity>,
    @InjectRepository(pdtcb_odEntity)
    private readonly pdtcb_odRepository: Repository<pdtcb_odEntity>,
  ) {}

  async createOrdenId(): Promise<any> {
    const orden = new OrdenEntity();
    orden.orden_id = new UniqueId().getId();
    await this.ordenRepository.save(orden);

    return { orden_id: orden.orden_id };
  }

  async getProductsByOrderId(orderId: createOrdenIdDto): Promise<any[]> {
    const pdtcb_odRecords = await this.pdtcb_odRepository.find({
      where: { orden_id: orderId.id },
      relations: ['producto'],
    });

    const products = pdtcb_odRecords.flatMap((pdtcb_od) => pdtcb_od.producto);

    return products;
  }
}
