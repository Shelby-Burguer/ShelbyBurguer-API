import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LugarDto } from '../../../ordenar_pedidos/application/dto/lugar.dto';
import { LugarService } from '../../../ordenar_pedidos/application/service/lugar.service';
import { JwtAuthGuard } from 'src/autenticacion/application/service/auth/jwt-auth.guard';
import { RolesGuard } from 'src/autenticacion/application/service/auth/rolesGuard.guard';
import { Roles } from 'src/autenticacion/application/service/auth/roles';

@Controller('lugares')
export default class LugarController {
  constructor(private readonly lugarService: LugarService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async findAll(): Promise<LugarDto[]> {
    return await this.lugarService.findAll();
  }

  @Get('id/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async findById(@Param('id') id: string): Promise<LugarDto> {
    return await this.lugarService.findById(id);
  }

  @Get('nombre/:nombre')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async findByNombre(@Param('nombre') nombre: string): Promise<LugarDto> {
    return await this.lugarService.findByNombre(nombre);
  }

  @Get('/:tipo')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async findByTipo(@Param('tipo') tipo: string): Promise<LugarDto[]> {
    return await this.lugarService.findAllByTipo(tipo);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async create(@Body() lugarDto: LugarDto): Promise<void> {
    console.log('Llega bien la estructura?S', lugarDto);
    return await this.lugarService.create(lugarDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async update(@Param('id') id: string, @Body() lugarDto: LugarDto) {
    return await this.lugarService.update(id, lugarDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async delete(@Param('id') id: string) {
    return await this.lugarService.delete(id);
  }
}
