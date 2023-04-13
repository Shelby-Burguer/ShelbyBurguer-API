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
import { createUserDto } from 'src/autenticacion/application/dto/createUser.dto';
import { recoveryKeyQDto } from 'src/autenticacion/application/dto/recoveryKey.dto';
import { recoveryKeyEDto } from 'src/autenticacion/application/dto/recoveryKeyE.dto';

@Controller('autenticacion')
export class autenticacionController {
  constructor(private readonly _autenticacionService: autenticacionService) {}
  
  @Post('/login')
  async login(@Body() credenciales: credencialesDto): Promise<{ token: string }> {
    const token = await this._autenticacionService.authenticateUser(credenciales);
    return { token };
  }

  @Post('/registro')
  async registroUser(@Body() createUser: createUserDto): Promise<any> {
    const resUser = await this._autenticacionService.createNewUser(createUser);
    return resUser ;
  }

  @Post('/recuperarPasswordE')
  async passwordUserE(@Body() recoveryKeyUser: recoveryKeyEDto): Promise<any> {
    const resUser = await this._autenticacionService.recoveryKeyEUser(recoveryKeyUser);
    return resUser ;
  }

  @Post('/recuperarPasswordQ')
  async passwordUserQ(@Body() recoveryKeyUser: recoveryKeyQDto): Promise<any> {
    const resUser = await this._autenticacionService.recoveryKeyQUser(recoveryKeyUser);
    return resUser;
  }
}