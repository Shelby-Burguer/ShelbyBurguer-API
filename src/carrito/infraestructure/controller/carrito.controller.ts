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
import { createCarritoDto } from '../../application/dto/createCarrito.dto';
import { carritoService } from '../../application/service/carrito.service';
import { JwtAuthGuard } from 'src/autenticacion/application/service/auth/jwt-auth.guard';
import { RolesGuard } from 'src/autenticacion/application/service/auth/rolesGuard.guard';
import { Roles } from 'src/autenticacion/application/service/auth/roles';

@Controller('carrito')
export class carritoController {
  constructor(private readonly _carritoService: carritoService) {}

  @Get('/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async getAllCarrito(): Promise<any> {
    return await this._carritoService.getAllCarrito();
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async create(@Body() carrito: createCarritoDto): Promise<any> {
    return await this._carritoService.createCarrito(carrito);
  }

  @Post('/create/ProductoOrdene')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async createProductoOdenes(
    @Body() carrito: createCarritoDto[],
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
  async deleteid(@Param() producto: createCarritoDto): Promise<any> {
    return await this._carritoService.deleteProductoCarrito(producto);
  }
}
