import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { createCarritoDto } from 'src/ordenar_pedidos/application/dto/createCarrito.dto';
import { carritoService } from 'src/ordenar_pedidos/application/service/carrito.service';


@Controller('carrito')
export class carritoController {
  constructor(
    private readonly _carritoService: carritoService,
  ) {}

  
  @Get('/all')
  async getAllCarrito(): Promise<any> {
    return await this._carritoService.getAllCarrito()
  }

  @Post('/create')
  async create(@Body() carrito: createCarritoDto): Promise<any> {
    return await this._carritoService.createCarrito(carrito);
  }

  @Delete('/delete')
  async delete(): Promise<any>{
    return await this._carritoService.deleteCarrito()
  }

  @Delete('/delete/:idProducto')
  async deleteid(@Param() producto: createCarritoDto): Promise<any>{
    return await this._carritoService.deleteProductoCarrito(producto)
  }

}