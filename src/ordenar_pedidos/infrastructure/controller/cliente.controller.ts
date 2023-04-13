import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClienteDTO } from '../../../ordenar_pedidos/application/dto/cliente.dto';
import { ClienteService } from '../../../ordenar_pedidos/application/service/cliente.service';
import { JwtAuthGuard } from 'src/autenticacion/application/service/auth/jwt-auth.guard';
import { RolesGuard } from 'src/autenticacion/application/service/auth/rolesGuard.guard';
import { Roles } from 'src/autenticacion/application/service/auth/roles';

@Controller('clientes')
export default class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async findAll(): Promise<ClienteDTO[]> {
    return await this.clienteService.findAll();
  }

  @Get('id/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async findById(@Param('id') id: string): Promise<ClienteDTO> {
    return await this.clienteService.findByText(id, 'id_cliente');
  }

  @Get('cedula/:cedula')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async findByCedula(@Param('cedula') cedula: string): Promise<ClienteDTO> {
    return await this.clienteService.findByText(cedula, 'cedula_cliente');
  }

  @Get('telefono/:telefono')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async findByTlf(@Param('telefono') telefono: string): Promise<ClienteDTO> {
    return await this.clienteService.findByText(telefono, 'telefono_cliente');
  }

  @Get('/nombre-completo')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
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
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(['Admin', 'Cajero'])
    async update(@Param('id') id: string, @Body() clienteDTO: ClienteDTO) {
    return await this.clienteService.update(id, clienteDTO);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async delete(@Param('id') id: string) {
    return await this.clienteService.delete(id);
  }
}
