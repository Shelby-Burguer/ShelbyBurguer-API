import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClienteDTO } from '../../../ordenar_pedidos/application/dto/cliente.dto';
import { ClienteService } from '../../../ordenar_pedidos/application/service/cliente.service';

@Controller('clientes')
export default class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  async findAll(): Promise<ClienteDTO[]> {
    return await this.clienteService.findAll();
  }

  @Get('id/:id')
  async findById(@Param('id') id: string): Promise<ClienteDTO> {
    return await this.clienteService.findByText(id, 'id_cliente');
  }

  @Get('cedula/:cedula')
  async findByCedula(@Param('cedula') cedula: string): Promise<ClienteDTO> {
    return await this.clienteService.findByText(cedula, 'cedula_cliente');
  }

  @Get('telefono/:telefono')
  async findByTlf(@Param('telefono') telefono: string): Promise<ClienteDTO> {
    return await this.clienteService.findByText(telefono, 'telefono_cliente');
  }

  @Get('/nombre-completo')
  async findAllByNombreCompleto(
    @Query('nombre') nombre: string,
    @Query('apellido') apellido: string,
  ): Promise<ClienteDTO[]> {
    return await this.clienteService.findAllByNombreCompleto(nombre, apellido);
  }

  @Post()
  async create(@Body() clienteDTO: ClienteDTO): Promise<void> {
    return await this.clienteService.create(clienteDTO);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() clienteDTO: ClienteDTO) {
    return await this.clienteService.update(id, clienteDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.clienteService.delete(id);
  }
}
