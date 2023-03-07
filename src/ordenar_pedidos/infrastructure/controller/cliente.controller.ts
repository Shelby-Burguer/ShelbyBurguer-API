import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('clientes')
export default class ClienteController {
  constructor(private readonly clienteService: any) {}

  @Get()
  async findAll(): Promise<void> {
    return await this.clienteService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<void> {
    return await this.clienteService.findById(id);
  }

  @Get(':nombre')
  async findByNombre(@Param('nombre') nombre: string): Promise<void> {
    return await this.clienteService.findByNombre(nombre);
  }

  @Post()
  async create(@Body() clienteDto: void): Promise<void> {
    return await this.clienteService.create(clienteDto);
  }

  @Put(':id')
  async update(@Body() clienteDto: void) {
    return await this.clienteService.update(clienteDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.clienteService.delete(id);
  }
}
