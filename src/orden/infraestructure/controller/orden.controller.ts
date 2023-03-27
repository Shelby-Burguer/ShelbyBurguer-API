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

  /*
  @Delete('/delete/:id')
  async delete(
    @Param() _createIgdtPdtDto: createComboDto,
  ): Promise<any>{
    return await this._igdtPdtService.deleteCombo(_createIgdtPdtDto)
  }
*/
}
