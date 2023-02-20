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
import { createProductoDto } from '../../application/dto/createProducto.dto';
import { createImagenIngredienteDto } from '../../application/dto/createImagenIngrediente.dto';
import { createProductocommand } from '../command/createProducto.command';
import { createImagenIngredientecommand } from '../command/createImage.command';
import { updateIngredientecommand } from '../command/updateIngrediente.command';
import { deleteingredientecommand } from '../command/deleteIngrediente.comand';
import { updateIngredientelDto } from '../../application/dto/updateIngrediente.dto';
import { idIngredienteDto } from '../../application/dto/idIngrediente.dto';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('productos')
export class productoController {
  constructor(
    private readonly _ingredienteService: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('/all')
  async getAllIngrediente(): Promise<readIngredienteDto[]> {
    return this._ingredienteService.execute<
      allIngredienteQuery,
      readIngredienteDto[]
    >(new allIngredienteQuery());
  }
/*
  @Get('/all/:id')
  async getOneIngrediente(
   @Param() ingredienteId: idIngredienteDto,
  ): Promise<readIngredienteDto[]> {
    return this._ingredienteService.execute<
      OneIngredienteQuery,
      readIngredienteDto[]
    >(new OneIngredienteQuery(ingredienteId));
  }
*/
  @Post('/create')
  async create(
    @Body() _createProductoDto: createProductoDto,
  ): Promise<any>{
    return await this.commandBus.execute<
      createProductocommand,
      createProductoDto
    >(new createProductocommand(_createProductoDto));
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