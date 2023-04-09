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

import { OrdenDto } from 'src/orden/application/dto/orden.dto';
import { ordenEstadoDto } from 'src/orden/application/dto/ordenEstado.dto';
import { pagoDto } from 'src/orden/application/dto/pago.dto';
import { montoBsDto } from 'src/orden/application/dto/montoBs.dto';
import { autenticacionService } from 'src/autenticacion/application/service/autenticacion.service';
import { userDto } from 'src/autenticacion/application/dto/user.dto';
import { credencialesDto } from 'src/autenticacion/application/dto/credenciales.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('autenticacion')
export class autenticacionController {
  constructor(private readonly _autenticacionService: autenticacionService) {}

  @Post('/create')
  async createId(@Body() user: userDto): Promise<any> {
     return await this._autenticacionService.createUser(user);
  }
  
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() credenciales: credencialesDto): Promise<{ token: string }> {
    const token = await this._autenticacionService.authenticateUser(credenciales);
    return { token };
  }
}