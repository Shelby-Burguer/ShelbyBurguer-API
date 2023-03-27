import { Injectable } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import UniqueId from '../../../shared/domain/UniqueUUID';
import { carritoEntity } from '../entities/carrito.orm';
import { iCarritoRepository } from '../repositories/carrito.repository';
import { createCarritoDto } from '../../application/dto/createCarrito.dto';
import { productoEntity } from '../../../producto_combo/infraestructure/orm/producto.orm';
import { pdtcb_odEntity } from '../../../orden/infraestructure/entities/pdtcb_od.orm';

@Injectable()
export class carritoPersisteceAdapter implements iCarritoRepository {
  constructor(
    @InjectRepository(carritoEntity)
    private readonly carritoRepository: Repository<carritoEntity>,
    @InjectRepository(productoEntity)
    private readonly productoRepository: Repository<productoEntity>,
    @InjectRepository(pdtcb_odEntity)
    private readonly pdtcb_odRepository: Repository<pdtcb_odEntity>,
  ) {}

  async getAllCarrito(): Promise<any[]> {
    const carrito: carritoEntity[] = await this.carritoRepository.find();
    console.log('carrito', carrito);

    const productos: productoEntity[] = [];

    for (const item of carrito) {
      const producto = await this.productoRepository.findOne({
        where: { producto_id: item.producto_id },
      });
      productos.push(producto);
    }

    return productos;
  }

  async createCarrito(carrito: createCarritoDto): Promise<any> {
    const carritoE = new carritoEntity();
    carritoE.carrito_id = new UniqueId().getId();
    carritoE.orden_id = carrito.idOrden;
    carritoE.producto_id = carrito.idProducto;
    await this.carritoRepository.save(carritoE);
    console.log(carritoE);

    return {
      carrito_id: carritoE.carrito_id,
      orden_id: carrito.idOrden,
      producto_id: carrito.idProducto,
    };
  }

  async createProductoOrdenes(carrito: createCarritoDto[]): Promise<any> {
    console.log(carrito);
    const promises = carrito.map(async (item) => {
      const pdtcb_od = new pdtcb_odEntity();
      pdtcb_od.pdtcb_od_id = new UniqueId().getId();
      pdtcb_od.orden_id = item.idOrden;
      pdtcb_od.producto_id = item.idProducto;
      pdtcb_od.combo_id = null;
      await this.pdtcb_odRepository.save(pdtcb_od);

      return {
        pdtcb_od_id: pdtcb_od.pdtcb_od_id,
        orden_id: item.idOrden,
        producto_id: item.idProducto,
      };
    });
    const results = await Promise.all(promises);
    return results;
  }

  async deleteCarrito(): Promise<any> {
    await this.carritoRepository.delete({});
    let messageDelete: string = 'Eiminación realizada';

    return messageDelete;
  }

  async deleteProductoCarrito(carrito: createCarritoDto): Promise<any> {
    console.log(carrito);
    await this.carritoRepository.delete({ producto_id: carrito.idProducto });
    let messageDelete: string = 'Eiminación realizada';

    return messageDelete;
  }
}
