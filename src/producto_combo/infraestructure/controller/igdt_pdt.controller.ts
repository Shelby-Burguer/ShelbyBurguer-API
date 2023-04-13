import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { createImagenIngredienteDto } from '../../application/dto/createImagenIngrediente.dto';
import { createImagenIngredientecommand } from '../command/createImage.command';
import { deleteingredientecommand } from '../command/deleteIngrediente.comand';
import { idIngredienteDto } from '../../application/dto/idIngrediente.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { createIgdtPdtDto } from '../../application/dto/createIgdtPdt.dto';
import { createIgdtPdtcommand } from '../command/createIgdtPdt.command';
import { allIgdtPdtQuery } from '../queryBus/allIgdtPdt.Query';
import { AllIgdtPdtIdQuery } from '../queryBus/AllIgdtPdtId.Query';
import { updateIgdtPdtcommand } from '../command/updateIgdtpdt.command';
import { createProductoDto } from '../../application/dto/createProducto.dto';
import { updateIgdtPdtDto } from 'src/producto_combo/application/dto/updateIgftPdt.dto';
import { JwtAuthGuard } from 'src/autenticacion/application/service/auth/jwt-auth.guard';
import { RolesGuard } from 'src/autenticacion/application/service/auth/rolesGuard.guard';
import { Roles } from 'src/autenticacion/application/service/auth/roles';

@Controller('ingredienteProducto')
export class igdtPdtController {
  constructor(
    private readonly _igdtPdtService: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async getAllIgdtPdt(): Promise<createIgdtPdtDto[]> {
    return this._igdtPdtService.execute<allIgdtPdtQuery, createIgdtPdtDto[]>(
      new allIgdtPdtQuery(),
    );
  }

  @Get('/all/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async getAllIgdtPdtId(
    @Param() ingredienteId: createIgdtPdtDto,
  ): Promise<createIgdtPdtDto[]> {
    return this._igdtPdtService.execute<AllIgdtPdtIdQuery, createIgdtPdtDto[]>(
      new AllIgdtPdtIdQuery(ingredienteId),
    );
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async create(@Body() _createIgdtPdtDto: createIgdtPdtDto[]): Promise<any> {
    return await this.commandBus.execute<
      createIgdtPdtcommand,
      createIgdtPdtDto
    >(new createIgdtPdtcommand(_createIgdtPdtDto));
  }

  @Put('/update/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async update(
    @Param() productoId: createProductoDto,
    @Body() _createIgdtPdtDto: updateIgdtPdtDto,
  ) {
    return await this.commandBus.execute<
      updateIgdtPdtcommand,
      createIgdtPdtDto
    >(new updateIgdtPdtcommand(productoId, _createIgdtPdtDto));
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
  async delete(@Param() ingredienteId: idIngredienteDto): Promise<any> {
    return await this.commandBus.execute<
      deleteingredientecommand,
      idIngredienteDto
    >(new deleteingredientecommand(ingredienteId));
  }

  @Put('/create/upload/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['Admin', 'Cajero'])
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
