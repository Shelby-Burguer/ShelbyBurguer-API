import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { createProductoDto } from '../../application/dto/createProducto.dto';
import { createProductocommand } from '../command/createProducto.command';
import { allProductoQuery } from '../queryBus/allProductoQuery';
import { deleteProductocommand } from '../command/deleteProducto.command';
import { updateproductocommand } from '../command/updateProducto.command';
import { JwtAuthGuard } from 'src/autenticacion/application/service/auth/jwt-auth.guard';
import { RolesGuard } from 'src/autenticacion/application/service/auth/rolesGuard.guard';
import { Roles } from 'src/autenticacion/application/service/auth/roles';


@Controller('productos')
export class productoController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'Cajero'])
  async getAllProducto(): Promise<createProductoDto[]> {
    return this.queryBus.execute<allProductoQuery, createProductoDto[]>(
      new allProductoQuery(),
    );
  }
  /*
  @Get('/all/:id')
  async getOneIngrediente(
   @Param() ingredienteId: idIngredienteDto,
  ): Promise<readIngredienteDto[]> {
    return this.queryBus.execute<
      OneIngredienteQuery,
      readIngredienteDto[]
    >(new OneIngredienteQuery(ingredienteId));
  }
*/
  @Post('/create')
  //@UseGuards(JwtAuthGuard)
  async create(@Body() _createProductoDto: createProductoDto): Promise<any> {
    return await this.commandBus.execute<
      createProductocommand,
      createProductoDto
    >(new createProductocommand(_createProductoDto));
  }

  @Put('/update/:id')
  //@UseGuards(JwtAuthGuard)
  async update(
    @Param() ingredienteId: createProductoDto,
    @Body() ingrediente: createProductoDto,
  ): Promise<any> {
    return await this.commandBus.execute<
      updateproductocommand,
      createProductoDto
    >(new updateproductocommand(ingrediente, ingredienteId));
  }

  @Delete('/delete/:id')
  //@UseGuards(JwtAuthGuard)
  async delete(@Param() productoId: createProductoDto): Promise<any> {
    return await this.commandBus.execute<
      deleteProductocommand,
      createProductoDto
    >(new deleteProductocommand(productoId));
  }

  /*
  @Put('/create/upload/:id')
  @UseInterceptors( FileInterceptor('file'))
  async upload(
    @Param() ingredienteId: idIngredienteDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<any>{


    const ImagenDto = new createImagenIngredienteDto();
    ImagenDto.nombreImagen = file.originalname;
    ImagenDto.datosImagen = file.buffer;

    return await this.commandBus.execute<
    createImagenIngredientecommand,      
    createImagenIngredienteDto
    >(new createImagenIngredientecommand(ImagenDto, ingredienteId));
  }*/
}
