import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LugarDto } from 'src/ordenar_pedidos/application/dto/lugar.dto';
import { LugarService } from 'src/ordenar_pedidos/application/service/lugar.service';

@Controller('lugares')
export class LugarController {
  constructor(private readonly lugarService: LugarService) {}

  @Get()
  async findAll() {
    return await this.lugarService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.lugarService.findOne(id);
  }

  @Post()
  async create(@Body() lugarDto: LugarDto) {
    return await this.lugarService.create(lugarDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() lugarDto: LugarDto) {
    return await this.lugarService.update(id, lugarDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.lugarService.delete(id);
  }
}
