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
  UseGuards
} from '@nestjs/common';

import { carritoService } from '../../application/service/carrito.service';
import { JwtAuthGuard } from 'src/autenticacion/application/service/auth/jwt-auth.guard';
import { RolesGuard } from 'src/autenticacion/application/service/auth/rolesGuard.guard';
import { Roles } from 'src/autenticacion/application/service/auth/roles';
import { createCarritoDto } from 'src/carrito/application/dto/createCarrito.dto';
import { createCarritoIngredienteDto } from 'src/carrito/application/dto/createCarritoIngrediente.dto';
import { createNewCarritoDto } from 'src/carrito/application/dto/createCarritoNew.dto';
import { createingredieteArrayDto } from 'src/carrito/application/dto/createIngredienteArray.dto';

@Controller('carrito')
export class carritoController {
  constructor(private readonly _carritoService: carritoService) {}

  @Get('/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async getAllCarrito(): Promise<any> {
    return await this._carritoService.getAllCarrito();
  }

  @Get('/ingrediente/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async getAllCarritoIngrediente(): Promise<any> {
    return await this._carritoService.getAllCarritoIngrediente();
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async create(@Body() carrito: createCarritoDto): Promise<any> {
    return await this._carritoService.createCarrito(carrito);
  }

  @Post('/ingredientes/create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async createCarritoIngrediente(@Body() carritoI: createCarritoIngredienteDto): Promise<any> {
    return await this._carritoService.createCarritoIngrediente(carritoI);
  }

  @Post('/create/ProductoOrdene')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async createProductoOdenes(
    @Body() carrito: createingredieteArrayDto 
  ): Promise<any> {
    return await this._carritoService.createProductoOrdenes(carrito);
  }

  @Delete('/delete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async delete(): Promise<any> {
    return await this._carritoService.deleteCarrito();
  }

  @Delete('/delete/:idProducto')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async deleteid(@Param() producto: createNewCarritoDto): Promise<any> {
    return await this._carritoService.deleteProductoCarrito(producto);
  }
}
