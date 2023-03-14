import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository, getRepository, In } from 'typeorm';
import { pdt_cbEntity } from '../../../producto_combo/infraestructure/orm/pdt_cb.orm';
import { InjectRepository } from '@nestjs/typeorm';
import UniqueId from 'src/shared/domain/UniqueUUID';
import { carritoEntity } from '../entities/carrito.orm';
import { iCarritoRepository } from '../repositories/carrito.repository';
import { createCarritoDto } from '../../application/dto/createCarrito.dto';
import { productoEntity } from '../../../producto_combo/infraestructure/orm/producto.orm';

@Injectable()
export class carritoPersisteceAdapter implements iCarritoRepository {
  constructor(
    @InjectRepository(carritoEntity)
    private readonly carritoRepository: Repository<carritoEntity>,
    @InjectRepository(productoEntity)
    private readonly productoRepository: Repository<productoEntity>,
  ) {}

    async getAllCarrito(): Promise<any[]> {
    const carrito: carritoEntity[] = await this.carritoRepository.find();

    const productosIds = carrito.map((item) => item.producto_id);
    const productos = await this.productoRepository.find({
        where: { producto_id: In(productosIds) },
    });

    return productos;
    }


  async createCarrito(carrito: createCarritoDto): Promise<any> {
    const carritoE = new carritoEntity();
    carritoE.carrito_id = new UniqueId().getId();
    carritoE.orden_id = carrito.idOrden;
    carritoE.producto_id = carrito.idProducto;
    await this.carritoRepository.save(carritoE);

    return {
    carrito_id: carritoE.carrito_id,
    orden_id: carrito.idOrden,
    producto_id: carrito.idProducto
    };
  }

  async deleteCarrito(): Promise<any> {
    await this.carritoRepository.delete({});
    let messageDelete: string = 'Eiminación realizada';

    return messageDelete;
  }

  async deleteProductoCarrito(carrito: createCarritoDto): Promise<any> {
    console.log(carrito)
    await this.carritoRepository.delete({ producto_id: carrito.idProducto });
    let messageDelete: string = 'Eiminación realizada';

    return messageDelete;
  }
}
