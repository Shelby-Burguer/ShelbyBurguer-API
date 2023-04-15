import { Injectable } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import UniqueId from '../../../shared/domain/UniqueUUID';
import { carritoEntity } from '../entities/carrito.orm';
import { iCarritoRepository } from '../repositories/carrito.repository';
import { createCarritoDto } from '../../application/dto/createCarrito.dto';
import { productoEntity } from '../../../producto_combo/infraestructure/orm/producto.orm';
import { pdtcb_odEntity } from '../../../orden/infraestructure/entities/pdtcb_od.orm';
import { carritoIngredienteEntity } from '../entities/carritoIngredientes.orm';
import { createCarritoIngredienteDto } from 'src/carrito/application/dto/createCarritoIngrediente.dto';
import { registro_productoEntity } from 'src/orden/infraestructure/entities/registroProducto.orm';
import { createNewCarritoDto } from 'src/carrito/application/dto/createCarritoNew.dto';
import { createingredieteArrayDto } from 'src/carrito/application/dto/createIngredienteArray.dto';

@Injectable()
export class carritoPersisteceAdapter implements iCarritoRepository {
  constructor(
    @InjectRepository(carritoEntity)
    private readonly carritoRepository: Repository<carritoEntity>,
    @InjectRepository(productoEntity)
    private readonly productoRepository: Repository<productoEntity>,
    @InjectRepository(pdtcb_odEntity)
    private readonly pdtcb_odRepository: Repository<pdtcb_odEntity>,
    @InjectRepository(carritoIngredienteEntity)
    private readonly carritoIngredienteRepository: Repository<carritoIngredienteEntity>,
    @InjectRepository(registro_productoEntity)
    private readonly registro_productoRepository: Repository<registro_productoEntity>,   
    
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

    async getAllCarritoIngrediente(): Promise<any[]> {
    const carrito: carritoIngredienteEntity[] = await this.carritoIngredienteRepository.find();
    console.log('CarritoIngrediente', carrito);

    return carrito;
  }

async createCarrito(carrito: createCarritoDto): Promise<any> {
  const carritoE = new carritoEntity();
  carritoE.carrito_id = new UniqueId().getId();
  carritoE.orden_id = carrito.idOrden;
  carritoE.producto_id = carrito.idProducto;
  await this.carritoRepository.save(carritoE);
  console.log(carritoE);

  for (let i = 0; i < carrito.ingrediente_id.length; i++) {
    const carritoI = new carritoIngredienteEntity();
    carritoI.carrito_ingrediente_id = new UniqueId().getId();
    carritoI.ingrediente_id = carrito.ingrediente_id[i].id;
    carritoI.cantidad = carrito.ingrediente_id[i].cantidad;
    carritoI.producto_id = carrito.idProducto;
    await this.carritoIngredienteRepository.save(carritoI);
    console.log(carritoI);
  }

  return {
    carrito_id: carritoE.carrito_id,
    orden_id: carrito.idOrden,
    producto_id: carrito.idProducto,
  };
}


  async createCarritoIngrediente(carritoIngrediente: createCarritoIngredienteDto): Promise<any> {
    const carritoI = new carritoIngredienteEntity();
    carritoI.carrito_ingrediente_id = new UniqueId().getId();
    carritoI.ingrediente_id = carritoIngrediente.ingrediente_id;
    carritoI.producto_id = carritoIngrediente.producto_id;
    await this.carritoIngredienteRepository.save(carritoI);
    console.log(carritoI);

    return {
      carrito_id: carritoI.carrito_ingrediente_id,
      ingrediente_id: carritoI.ingrediente_id,
      producto_id: carritoI.producto_id
    };
  }

async createProductoOrdenes(registro_producto: createingredieteArrayDto): Promise<any> {
console.log('Este es el ingrediente', registro_producto.ingrediente_id)
  await registro_producto.productos.map(async (item) => {
    const pdtcb_od = new pdtcb_odEntity();
    pdtcb_od.pdtcb_od_id = new UniqueId().getId();
    pdtcb_od.orden_id = item.idOrden;
    pdtcb_od.producto_id = item.idProducto;
    pdtcb_od.combo_id = null;
    await this.pdtcb_odRepository.save(pdtcb_od);
    
    await registro_producto.ingrediente_id.map(async (ingrediente) => {
    console.log('Este es el ingrediente dento del map')
      const registroProducto = new registro_productoEntity();
      registroProducto.registro_producto_id = new UniqueId().getId();
      registroProducto.ingrediente_id = ingrediente.ingrediente_id;
      registroProducto.pdtcb_od_id = pdtcb_od.pdtcb_od_id;
      registroProducto.producto_id = item.idProducto;

      console.log('Este es el ingrediente dento del map', registroProducto)
      await this.registro_productoRepository.save(registroProducto);
    });

   // const resultsRegistroProducto = await Promise.all(promisesRegistroProducto);

   
  });
 return {};
}

  async deleteCarrito(): Promise<any> {
    await this.carritoRepository.delete({});
    await this.registro_productoRepository.delete({});
    let messageDelete: string = 'Eiminación realizada';

    return messageDelete;
  }

  async deleteProductoCarrito(carrito: createNewCarritoDto): Promise<any> {
    console.log(carrito);
    await this.carritoRepository.delete({ producto_id: carrito.idProducto });
    let messageDelete: string = 'Eiminación realizada';

    return messageDelete;
  }
}
