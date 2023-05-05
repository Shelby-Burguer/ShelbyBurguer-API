import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
    try {
      const carrito: carritoEntity[] = await this.carritoRepository.find();

      const productos: productoEntity[] = [];

      for (const item of carrito) {
        const producto = await this.productoRepository.findOne({
          where: { producto_id: item.producto_id },
        });

        const ingredientes = await this.carritoIngrediente_carritoRepository.find({
          where: { carrito_id: item.carrito_id },
          relations: ['carritoIngrediente'],
        });

        let precioTotal = Number(producto.costo_producto);

        for (const ingrediente of ingredientes) {
          const precioIngrediente = Number(ingrediente.carritoIngrediente.precio);
          precioTotal += precioIngrediente;
        }

        producto.costo_producto = precioTotal.toString();

        productos.push(producto);
      }

      return productos;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
    }

  async getAllCarritoIngrediente(): Promise<any[]> {
  try {
    const carrito: carritoIngredienteEntity[] =
      await this.carritoIngredienteRepository.find();

    return carrito;
  } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async createCarrito(carrito: createCarritoDto): Promise<any> {
   try {
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
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async createCarritoIngrediente(
    carritoIngrediente: createCarritoIngredienteDto,
  ): Promise<any> {
  try {
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
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

async createProductoOrdenes(carrito: createingredieteArrayDto): Promise<any> {
  try {
  const todosoproductoCarrito = await this.carritoRepository.find();
  
  // Obtener todos los registros de la tabla carritoIngrediente_carrito con sus relaciones correspondientes
  const carritoIngredientesCarrito =
    await this.carritoIngrediente_carritoRepository.find({
      relations: [
        'carrito',
        'carritoIngrediente'
      ],
    });

  const productosSinIngredientes = todosoproductoCarrito.filter(
  (producto) =>
    !carritoIngredientesCarrito.some(
      (cic) => cic.carrito.producto_id === producto.producto_id
    )
  );

  console.log('Test baby funciona', productosSinIngredientes)

    for (let i = 0; i < productosSinIngredientes.length; i++) {
      const pdtcb_od = new pdtcb_odEntity();
      pdtcb_od.pdtcb_od_id = new UniqueId().getId();
      pdtcb_od.producto_id = productosSinIngredientes[i].producto_id
      pdtcb_od.orden_id = productosSinIngredientes[0].orden_id;
      pdtcb_od.combo_id = null;
      await this.pdtcb_odRepository.save(pdtcb_od);
    }

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
  } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
}

  async deleteCarrito(): Promise<any> {
  try {
    await this.carritoRepository.delete({});
    await this.carritoIngredienteRepository.delete({});
    let messageDelete: string = 'Eiminación realizada';

    return messageDelete;
   } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteProductoCarrito(carrito: createNewCarritoDto): Promise<any> {
  try {
    console.log('id carrito para eliminar', carrito);
    await this.carritoRepository.delete({ producto_id: carrito.idProducto });
    let messageDelete: string = 'Eiminación realizada';

    return messageDelete;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  
}
