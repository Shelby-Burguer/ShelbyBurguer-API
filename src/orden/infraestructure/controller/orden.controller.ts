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
  UseGuards,
} from '@nestjs/common';
import { ordenService } from '../../application/service/orden.service';
import { createOrdenIdDto } from '../../application/dto/createOrdenId.dto';
import { OrdenDto } from 'src/orden/application/dto/orden.dto';
import { ordenEstadoDto } from 'src/orden/application/dto/ordenEstado.dto';
import { pagoDto } from 'src/orden/application/dto/pago.dto';
import { montoBsDto } from 'src/orden/application/dto/montoBs.dto';
import { JwtAuthGuard } from 'src/autenticacion/application/service/auth/jwt-auth.guard';
import { RolesGuard } from 'src/autenticacion/application/service/auth/rolesGuard.guard';
import { Roles } from 'src/autenticacion/application/service/auth/roles';
import { accionUserDto } from 'src/orden/application/dto/accionUser.dto';
import { ordenIdDto } from 'src/orden/application/dto/ordenId.dto';

@Controller('orden')
export class ordenController {
  constructor(private readonly _ordenService: ordenService) {}

  @Get('/all/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async getAllProductos(@Param() orderId: createOrdenIdDto): Promise<any> {
    return await this._ordenService.getAllProductsByOrder(orderId);
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async createId(): Promise<any> {
    return await this._ordenService.createOrdenId();
  }

  @Get('/one/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async getOrden(@Param() orderId: createOrdenIdDto): Promise<any> {
    return await this._ordenService.getOrderId(orderId);
  }

  @Put('/update/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async getOrdenUpdate(@Param() orderId: createOrdenIdDto, @Body() orden: OrdenDto): Promise<any> {
    return await this._ordenService.procesarOrdenId(orderId, orden);
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async deleteOrden(@Param() orderId: createOrdenIdDto): Promise<any> {
    return await this._ordenService.deleteOrderId(orderId);
  }

  @Get('/All')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async getAllOrden(): Promise<any> {
    return await this._ordenService.obtenerTodasLasOrdenesConDetalle();
  }

  @Get('/estados/All')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async getAllEstados(): Promise<any> {
    return await this._ordenService.getEstados();
  }

  @Post('/ordenEstado/create')
    @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async createordenEstado(@Body() estadoOrden: ordenEstadoDto): Promise<any> {
    return await this._ordenService.createOrdenEstado(estadoOrden);
  }

  @Post('/ordenPago/create/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async createordenPago(@Param() orderId: createOrdenIdDto, @Body() pago: pagoDto): Promise<any> {
    return await this._ordenService.createOrdenPago(orderId, pago);
  }

  @Get('/pagos/All/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async getAllPagos (@Param() orderId: createOrdenIdDto): Promise<any> {
    return await this._ordenService.getAllPagos(orderId);
  }

  @Post('/montoBsDolares/create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async createMontoBsDolares(@Body() montoBs: montoBsDto): Promise<any> {
    return await this._ordenService.createMontoBS(montoBs);
  }
  
  @Get('/montoBsDolares/All')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async getMontoBsDolares(): Promise<any> {
    return await this._ordenService.getAllMontoBS();
  }

  @Post('/accionUsuario/create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async accion_user(@Body() accionUser: accionUserDto): Promise<any> {
    return await this._ordenService.createAccionUser(accionUser);
  }

  @Get('/accionUsuario/All/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async getAccionUserByOrder(@Param() orderId: ordenIdDto): Promise<any> {
    return await this._ordenService.getAccionUserByOrder(orderId);
  }

}
