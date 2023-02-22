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
import { createIgdtPdtDto } from '../../application/dto/createIgdtPdt.dto';
import { createIgdtPdtcommand } from '../command/createIgdtPdt.command';
import { allIgdtPdtQuery } from '../queryBus/allIgdtPdt.Query';

@Controller('ingredienteProducto')
export class igdtPdtController {
  constructor(
    private readonly _ingredienteService: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('/all')
  async getAllIgdtPdt(): Promise<createIgdtPdtDto[]> {
    return this._ingredienteService.execute<
      allIgdtPdtQuery,
      createIgdtPdtDto[]
    >(new allIgdtPdtQuery());
  }

  @Get('/all/:id')
  async getOneIngrediente(
   @Param() ingredienteId: idIngredienteDto,
  ): Promise<readIngredienteDto[]> {
    return this._ingredienteService.execute<
      OneIngredienteQuery,
      readIngredienteDto[]
    >(new OneIngredienteQuery(ingredienteId));
  }

  @Post('/create')
  async create(
    @Body() _createIgdtPdtDto: createIgdtPdtDto,
  ): Promise<any>{
    return await this.commandBus.execute<
      createIgdtPdtcommand,
      createIgdtPdtDto
    >(new createIgdtPdtcommand(_createIgdtPdtDto));
  }

 @Patch('/update/:id')
  async update(
    @Param() ingredienteId: idIngredienteDto,
    @Body() ingrediente: updateIngredientelDto,
  ): Promise<any> {
   return await  this.commandBus.execute<updateIngredientecommand,updateIngredientelDto>(
      new updateIngredientecommand(ingrediente, ingredienteId),
    );
  } 

  @Delete('/delete/:id')
  async delete(
  @Param() ingredienteId: idIngredienteDto,
  ): Promise<any> {
   return await  this.commandBus.execute<deleteingredientecommand,idIngredienteDto>(
      new deleteingredientecommand(ingredienteId),
    );
  }


 
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
  }

}