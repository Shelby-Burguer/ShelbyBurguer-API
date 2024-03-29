import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { readIngredienteDto } from '../../application/dto/readingrediente.dto';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { allIngredienteQuery } from '../queryBus/allIngredientesQuery';
import { OneIngredienteQuery } from '../queryBus/oneIngrediente.Queryt';
import { createIngredienteDto } from '../../application/dto/createIngrediente.dto';
import { createImagenIngredienteDto } from '../../application/dto/createImagenIngrediente.dto';
import { createIngredientecommand } from '../command/createIngrediente.command';
import { createImagenIngredientecommand } from '../command/createImage.command';
import { updateIngredientecommand } from '../command/updateIngrediente.command';
import { deleteingredientecommand } from '../command/deleteIngrediente.comand';
import { updateIngredientelDto } from '../../application/dto/updateIngrediente.dto';
import { idIngredienteDto } from '../../application/dto/idIngrediente.dto';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { JwtAuthGuard } from 'src/autenticacion/application/service/auth/jwt-auth.guard';
import { RolesGuard } from 'src/autenticacion/application/service/auth/rolesGuard.guard';
import { Roles } from 'src/autenticacion/application/service/auth/roles';


@Controller('ingrediente')
export class ingredienteController {
  constructor(
    private readonly _ingredienteService: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async getAllIngrediente(): Promise<readIngredienteDto[]> {
    return this._ingredienteService.execute<
      allIngredienteQuery,
      readIngredienteDto[]
    >(new allIngredienteQuery());
  }

  @Get('/all/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async getOneIngrediente(
    @Param() ingredienteId: idIngredienteDto,
  ): Promise<readIngredienteDto[]> {
    return this._ingredienteService.execute<
      OneIngredienteQuery,
      readIngredienteDto[]
    >(new OneIngredienteQuery(ingredienteId));
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin'])
  async create(
    @Body() _createIngredientenDto: createIngredienteDto,
  ): Promise<any> {
    return await this.commandBus.execute<
      createIngredientecommand,
      createIngredienteDto
    >(new createIngredientecommand(_createIngredientenDto));
  }

  @Patch('/update/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin'])
  async update(
    @Param() ingredienteId: idIngredienteDto,
    @Body() ingrediente: updateIngredientelDto,
  ): Promise<any> {
    return await this.commandBus.execute<
      updateIngredientecommand,
      updateIngredientelDto
    >(new updateIngredientecommand(ingrediente, ingredienteId));
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin'])
  async delete(@Param() ingredienteId: idIngredienteDto): Promise<any> {
    return await this.commandBus.execute<
      deleteingredientecommand,
      idIngredienteDto
    >(new deleteingredientecommand(ingredienteId));
  }

  @Put('/create/upload/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin'])
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Param() ingredienteId: idIngredienteDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const ImagenDto = new createImagenIngredienteDto();
    ImagenDto.nombreImagen = file.originalname;
    ImagenDto.datosImagen = file.buffer;

    return await this.commandBus.execute<
      createImagenIngredientecommand,
      createImagenIngredienteDto
    >(new createImagenIngredientecommand(ImagenDto, ingredienteId));
  }
}
