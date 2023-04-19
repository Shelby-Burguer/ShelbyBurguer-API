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
import { carritoIngrediente_carritoEntity } from '../entities/carritoIngredienteCarritoEntity.orm';

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
    @InjectRepository(carritoIngrediente_carritoEntity)
    private readonly carritoIngrediente_carritoRepository: Repository<carritoIngrediente_carritoEntity>,
  ) {}

  async getAllCarrito(): Promise<any[]> {
    const carrito: carritoEntity[] = await this.carritoRepository.find();

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
    const carrito: carritoIngredienteEntity[] =
      await this.carritoIngredienteRepository.find();

    return carrito;
  }

  async createCarrito(carrito: createCarritoDto): Promise<any> {
   
    const carritoE = new carritoEntity();
    carritoE.carrito_id = new UniqueId().getId();
    carritoE.orden_id = carrito.idOrden;
    carritoE.producto_id = carrito.idProducto;
    await this.carritoRepository.save(carritoE);


    let carritoIngredienteCarritoId: string;
    for (let i = 0; i < carrito.ingrediente_id.length; i++) {
      const carritoI = new carritoIngredienteEntity();
      carritoI.carrito_ingrediente_id = new UniqueId().getId();
      carritoI.ingrediente_id = carrito.ingrediente_id[i].id;
      carritoI.cantidad = carrito.ingrediente_id[i].cantidad;
      carritoI.precio = carrito.ingrediente_id[i].precio;
      carritoI.producto_id = carrito.idProducto;
      await this.carritoIngredienteRepository.save(carritoI);

      const carritoIngredienteCarrito = new carritoIngrediente_carritoEntity();
      carritoIngredienteCarrito.carritoingrediente_carrito_id =
        new UniqueId().getId();
      carritoIngredienteCarrito.carrito_id = carritoE.carrito_id;
      carritoIngredienteCarrito.carrito_ingrediente_id =
        carritoI.carrito_ingrediente_id;
      await this.carritoIngrediente_carritoRepository.save(
        carritoIngredienteCarrito,
      );

      if (i === 0) {
        carritoIngredienteCarritoId =
          carritoIngredienteCarrito.carritoingrediente_carrito_id;
      }
    }

    return {
      carrito_id: carritoE.carrito_id,
      orden_id: carrito.idOrden,
      producto_id: carrito.idProducto,
      carritoIngrediente_carrito_id: carritoIngredienteCarritoId,
    };
  }

  async createCarritoIngrediente(
    carritoIngrediente: createCarritoIngredienteDto,
  ): Promise<any> {
    const carritoI = new carritoIngredienteEntity();
    carritoI.carrito_ingrediente_id = new UniqueId().getId();
    carritoI.ingrediente_id = carritoIngrediente.ingrediente_id;
    carritoI.producto_id = carritoIngrediente.producto_id;
    await this.carritoIngredienteRepository.save(carritoI);

    
    return {
      carrito_id: carritoI.carrito_ingrediente_id,
      ingrediente_id: carritoI.ingrediente_id,
      producto_id: carritoI.producto_id,
    };
  }

async createProductoOrdenes(carrito: createingredieteArrayDto): Promise<any> {
  // Obtener todos los registros de la tabla carritoIngrediente_carrito con sus relaciones correspondientes
  const carritoIngredientesCarrito =
    await this.carritoIngrediente_carritoRepository.find({
      relations: [
        'carrito',
        'carritoIngrediente'
      ],
    });

  // Agrupar los registros por carrito_id
  const carritos = carritoIngredientesCarrito.reduce((acc, cic) => {
    if (!acc[cic.carrito_id]) {
      acc[cic.carrito_id] = [];
    }
    acc[cic.carrito_id].push(cic);
    return acc;
  }, {});

  // Recorrer cada carrito
  for (const carritoId in carritos) {
    if (carritos.hasOwnProperty(carritoId)) {
      const pdtcb_od = new pdtcb_odEntity();
      pdtcb_od.pdtcb_od_id = new UniqueId().getId();
      pdtcb_od.producto_id = carritos[carritoId][0].carrito.producto_id;
      pdtcb_od.orden_id = carritos[carritoId][0].carrito.orden_id;
      pdtcb_od.combo_id = null;
      await this.pdtcb_odRepository.save(pdtcb_od);

      // Recorrer cada registro de carritoIngrediente_carrito para este carrito
      for (const cic of carritos[carritoId]) {
        const registroProducto = new registro_productoEntity();
        registroProducto.registro_producto_id = new UniqueId().getId();
        registroProducto.ingrediente_id = cic.carritoIngrediente.ingrediente_id;
        registroProducto.pdtcb_od_id = pdtcb_od.pdtcb_od_id;
        registroProducto.producto_id = cic.carrito.producto_id;
        registroProducto.cantidad = cic.carritoIngrediente.cantidad;
        registroProducto.precio = cic.carritoIngrediente.precio;
        await this.registro_productoRepository.save(registroProducto);
      }
    }
  }
  console.log('Sale?')
  return {};
}

  async deleteCarrito(): Promise<any> {
    await this.carritoRepository.delete({});
    await this.carritoIngredienteRepository.delete({});
    let messageDelete: string = 'Eiminación realizada';

    return messageDelete;
  }

  async deleteProductoCarrito(carrito: createNewCarritoDto): Promise<any> {
    console.log('id carrito para eliminar', carrito);
    await this.carritoRepository.delete({ producto_id: carrito.idProducto });
    let messageDelete: string = 'Eiminación realizada';

    return messageDelete;
  }
}
