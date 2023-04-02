import { Inject, Injectable } from '@nestjs/common';

import { createOrdenIdDto } from '../dto/createOrdenId.dto';
import { iOrdenRepository } from '../../infraestructure/repositories/orden.repository';
import { OrdenDto } from '../dto/orden.dto';

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

  async getOrderId(orderId: createOrdenIdDto): Promise<any[]> {
    const orden = await this.iOrden.getOrderId(orderId);
    return orden;
    
  }

  async deleteOrderId(orderId: createOrdenIdDto): Promise<any[]> {
    const orden = await this.iOrden.deleteOrderId(orderId);
    return orden;
  }

  async procesarOrdenId(orderId: createOrdenIdDto, orden: OrdenDto): Promise<any[]> {
    const resOrden = await this.iOrden.procesarOrdenId(orderId, orden);
    return resOrden;
  }
  
  async obtenerTodasLasOrdenesConDetalle(): Promise<any[]>{
    const resOrden = await this.iOrden.obtenerTodasLasOrdenesConDetalle();
    return resOrden;
  }

  async getEstados(): Promise<any[]>{
    const orden = await this.iOrden.getEstados();
    return orden;
  }

  async createOrdenEstado(estadoOrden): Promise<any> {
    const ordenEstado = await this.iOrden.createOrdenEstado(estadoOrden);
    return ordenEstado;
  }
}
