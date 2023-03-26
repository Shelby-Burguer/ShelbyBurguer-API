import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { iOrdenRepository } from '../repositories/orden.repository';
import { createOrdenIdDto } from '../../application/dto/createOrdenId.dto';
import { OrdenEntity } from '../entities/orden.orm';
import UniqueId from '../../../shared/domain/UniqueUUID';
import { pdtcb_odEntity } from '../entities/pdtcb_od.orm';
import { OrdenDto } from 'src/orden/application/dto/orden.dto';

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

    // Obtener la fecha y hora actual
    const fechaActual = new Date();
    const fecha = `${fechaActual.getFullYear()}-${
      fechaActual.getMonth() + 1
    }-${fechaActual.getDate()}`;

    // Obtener la última orden del día actual
    const ultimaOrden = await this.ordenRepository.findOne({
      where: {
        fecha_orden: fecha,
      },
      order: {
        numero_orden: 'DESC',
      },
    });

    // Asignar el nuevo número de orden
    orden.numero_orden = ultimaOrden ? parseInt(ultimaOrden.numero_orden.toString()) + 1 : 1;
    orden.fecha_orden = fecha;

    await this.ordenRepository.save(orden);

    return { orden_id: orden.orden_id, numero_orden: orden.numero_orden };
  }

  async getProductsByOrderId(orderId: createOrdenIdDto): Promise<any[]> {
    const pdtcb_odRecords = await this.pdtcb_odRepository.find({
      where: { orden_id: orderId.id },
      relations: ['producto'],
    });

    const products = pdtcb_odRecords.flatMap((pdtcb_od) => pdtcb_od.producto);

    return products;
  }

  async getOrderId(orderId: createOrdenIdDto): Promise<any> {
    const order = await this.ordenRepository.findOne({
      where: { orden_id: orderId.id },
    });

    return order;
  }

  async deleteOrderId(orderId: createOrdenIdDto): Promise<any> {
    await this.ordenRepository.delete(orderId.id);
    return {};
  }

  async procesarOrdenId(orderId: createOrdenIdDto, orden: OrdenDto): Promise<any> {
    const horaActual = new Date();
    const horaOrden = horaActual.toLocaleTimeString();

    if(orden.numero_mesa){
     const result = await this.ordenRepository.update(orderId.id, { hora_orden: horaOrden, descuento: orden.descuento.toString(), tipo_orden: orden.tipo_orden, cliente_id: orden.lugar_id, numero_mesa: orden.numero_mesa});
    
      if (result.affected === 0) {
        throw new NotFoundException(`Orden con id ${orderId.id} no encontrada`);
      }
    } else {
        const result = await this.ordenRepository.update(orderId.id, { hora_orden: horaOrden, descuento: orden.descuento.toString(), tipo_orden: orden.tipo_orden, cliente_id: orden.lugar_id});

        if (result.affected === 0) {
            throw new NotFoundException(`Orden con id ${orderId.id} no encontrada`);
        }
    }



    return {};
}

}
