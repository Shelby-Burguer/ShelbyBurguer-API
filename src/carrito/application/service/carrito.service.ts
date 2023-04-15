import { Inject, Injectable } from '@nestjs/common';

import { iCarritoRepository } from '../../infraestructure/repositories/carrito.repository';
import { createCarritoDto } from '../dto/createCarrito.dto';
import { createCarritoIngredienteDto } from '../dto/createCarritoIngrediente.dto';
import { createNewCarritoDto } from '../dto/createCarritoNew.dto';
import { createingredieteArrayDto } from '../dto/createIngredienteArray.dto';

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

    async getAllCarritoIngrediente(): Promise<any[]> {
    const productos = await this.iCarrito.getAllCarritoIngrediente();
    return productos;
  }

  async createCarrito(carrito: createCarritoDto): Promise<any> {
  const carritoRes = await this.iCarrito.createCarrito(carrito)

    return carritoRes;
  }

    async createCarritoIngrediente(carritoI: createCarritoIngredienteDto): Promise<any> {
    const carritoRes = await this.iCarrito.createCarritoIngrediente(carritoI);
    return carritoRes;
  }

  async createProductoOrdenes( carrito: createingredieteArrayDto): Promise<any> {
    const carritoRes = await this.iCarrito.createProductoOrdenes(carrito);
    return carritoRes;
  }

  async deleteCarrito(): Promise<any[]> {
    const resString = await this.iCarrito.deleteCarrito();
    return resString;
  }

  async deleteProductoCarrito(carrito: createNewCarritoDto): Promise<any[]> {
    const resString = await this.iCarrito.deleteProductoCarrito(carrito);
    return resString;
  }
}
