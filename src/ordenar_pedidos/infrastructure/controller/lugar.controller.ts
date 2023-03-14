import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LugarDto } from '../../../ordenar_pedidos/application/dto/lugar.dto';
import { LugarService } from '../../../ordenar_pedidos/application/service/lugar.service';

@Controller('lugares')
export default class LugarController {
  constructor(private readonly lugarService: LugarService) {}

  @Get()
  async findAll(): Promise<LugarDto[]> {
    return await this.lugarService.findAll();
  }

  @Get('id/:id')
  async findById(@Param('id') id: string): Promise<LugarDto> {
    return await this.lugarService.findById(id);
  }

  @Get('nombre/:nombre')
  async findByNombre(@Param('nombre') nombre: string): Promise<LugarDto> {
    return await this.lugarService.findByNombre(nombre);
  }

  @Get('/:tipo')
  async findByTipo(@Param('tipo') tipo: string): Promise<LugarDto[]> {
    return await this.lugarService.findAllByTipo(tipo);
  }

  @Post()
  async create(@Body() lugarDto: LugarDto): Promise<void> {
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
