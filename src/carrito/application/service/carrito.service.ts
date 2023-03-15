import { Inject, Injectable } from '@nestjs/common';

import { iCarritoRepository } from '../../infraestructure/repositories/carrito.repository';
import { createCarritoDto } from '../dto/createCarrito.dto';

@Injectable()
export class carritoService {
  constructor(
    @Inject('iCarritoRepository')
    private readonly iCarrito: iCarritoRepository,
  ) {}

  async getAllCarrito(): Promise<any[]> {
    const productos = await this.iCarrito.getAllCarrito();
    return productos;
  }

  async createCarrito(carrito: createCarritoDto): Promise<any> {
    const carritoRes = await this.iCarrito.createCarrito(carrito);
    return carritoRes;
  }

  async createProductoOrdenes(carrito: createCarritoDto[]): Promise<any> {
    const carritoRes = await this.iCarrito.createProductoOrdenes(carrito);
    return carritoRes;
  }

  async deleteCarrito(): Promise<any[]> {
    const resString = await this.iCarrito.deleteCarrito();
    return resString;
  }

  async deleteProductoCarrito(carrito: createCarritoDto): Promise<any[]> {
    const resString = await this.iCarrito.deleteProductoCarrito(carrito);
    return resString;
  }
}
