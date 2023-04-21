import { Inject, Injectable } from '@nestjs/common';

import { createOrdenIdDto } from '../dto/createOrdenId.dto';
import { iOrdenRepository } from '../../infraestructure/repositories/orden.repository';
import { OrdenDto } from '../dto/orden.dto';
import { montoBsDto } from '../dto/montoBs.dto';

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

  async createOrdenPago(idOrden, ordenPago): Promise<any> {
    const ordenEstado = await this.iOrden.createOrdenPago(idOrden, ordenPago);
    return ordenEstado;
  }

  async getAllPagos(orderId): Promise<any> {
    const ordenEstado = await this.iOrden.getAllPagos(orderId);
    return ordenEstado;
  }

  async createMontoBS(montoBs): Promise<any>{
    const montoBsDolares = await this.iOrden.createMontoBS(montoBs);

    return montoBsDolares;
  }

  async getAllMontoBS(): Promise<montoBsDto[]>{
    const montoBsDolares = await this.iOrden.getAllMontoBS();
    return montoBsDolares;
  }
}
