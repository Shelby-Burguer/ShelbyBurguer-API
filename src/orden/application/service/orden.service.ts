import { Inject, Injectable } from '@nestjs/common';

import { createOrdenIdDto } from '../dto/createOrdenId.dto';
import { iOrdenRepository } from '../../infraestructure/repositories/orden.repository';

@Injectable()
export class ordenService {
  constructor(
    @Inject('iOrdenRepository')
    private readonly iOrden: iOrdenRepository,
  ) {}

  async getAllProductsByOrder(orderId: createOrdenIdDto): Promise<any[]> {
    const productos = await this.iOrden.getProductsByOrderId(orderId);
    return productos;
  }

  async createOrdenId(): Promise<any> {
    const orden = await this.iOrden.createOrdenId();
    return orden;
  }
}
