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
import { ordenService } from '../../application/service/orden.service';
import { createOrdenIdDto } from '../../application/dto/createOrdenId.dto';
import { OrdenDto } from 'src/orden/application/dto/orden.dto';
import { ordenEstadoDto } from 'src/orden/application/dto/ordenEstado.dto';
import { pagoDto } from 'src/orden/application/dto/pago.dto';

@Controller('orden')
export class ordenController {
  constructor(private readonly _ordenService: ordenService) {}

  @Get('/all/:id')
  async getAllProductos(@Param() orderId: createOrdenIdDto): Promise<any> {
    return await this._ordenService.getAllProductsByOrder(orderId);
  }

  @Post('/create')
  async createId(): Promise<any> {
    return await this._ordenService.createOrdenId();
  }

  @Get('/one/:id')
  async getOrden(@Param() orderId: createOrdenIdDto): Promise<any> {
    return await this._ordenService.getOrderId(orderId);
  }

  @Put('/update/:id')
  async getOrdenUpdate(@Param() orderId: createOrdenIdDto, @Body() orden: OrdenDto): Promise<any> {
    return await this._ordenService.procesarOrdenId(orderId, orden);
  }

  @Delete('/delete/:id')
  async deleteOrden(@Param() orderId: createOrdenIdDto): Promise<any> {
    return await this._ordenService.deleteOrderId(orderId);
  }

  @Get('/All')
  async getAllOrden(): Promise<any> {
    return await this._ordenService.obtenerTodasLasOrdenesConDetalle();
  }

    @Get('/estados/All')
  async getAllEstados(): Promise<any> {
    return await this._ordenService.getEstados();
  }


  @Post('/ordenEstado/create')
  async createordenEstado(@Body() estadoOrden: ordenEstadoDto): Promise<any> {
    return await this._ordenService.createOrdenEstado(estadoOrden);
  }

  @Post('/ordenPago/create/:id')
  async createordenPago(@Param() orderId: createOrdenIdDto, @Body() pago: pagoDto): Promise<any> {
    return await this._ordenService.createOrdenPago(orderId, pago);
  }

  
  @Get('/pagos/All/:id')
  async getAllPagos (@Param() orderId: createOrdenIdDto): Promise<any> {
    return await this._ordenService.getAllPagos(orderId);
  }

  /*
  @Delete('/delete/:id')
  async delete(
    @Param() _createIgdtPdtDto: createComboDto,
  ): Promise<any>{
    return await this._igdtPdtService.deleteCombo(_createIgdtPdtDto)
  }
*/
}
