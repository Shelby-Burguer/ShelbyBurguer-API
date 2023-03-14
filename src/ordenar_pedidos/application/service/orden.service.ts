import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { productoDataMapper } from '../../../producto_combo/domain/mappers/producto.mapper';
import { igdtPdtDataMapper } from '../../../producto_combo/domain/mappers/igdtPdt.mapper';
import { icomboRepository } from '../../../producto_combo/application/repository/combo.repository';
import { createOrdenIdDto } from '../dto/createOrdenId.dto';
import { iOrdenRepository } from '../../infrastructure/repositories/orden.repository';

@Injectable()
export class ordenService {
  constructor(
    @Inject('iOrdenRepository')
    private readonly iOrden: iOrdenRepository,
  ) {}


  async createOrdenId(): Promise<any> {
    const orden = await this.iOrden.createOrdenId();
    return orden;
  }
  
}
