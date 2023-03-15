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
  /*
  @Delete('/delete/:id')
  async delete(
    @Param() _createIgdtPdtDto: createComboDto,
  ): Promise<any>{
    return await this._igdtPdtService.deleteCombo(_createIgdtPdtDto)
  }
*/
}
