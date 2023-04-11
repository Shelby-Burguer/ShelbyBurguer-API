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
  UseGuards
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
import { AllIgdtPdtIdQuery } from '../queryBus/AllIgdtPdtId.Query';
import { updateIgdtPdtcommand } from '../command/updateIgdtpdt.command';
import { createProductoDto } from '../../application/dto/createProducto.dto';
import { updateIgdtPdtDto } from '../../application/dto/updateIgftPdt.dto';
import { comboService } from '../../application/service/combo.service';
import { createComboDto } from '../../application/dto/createCombo.dto';
import { JwtAuthGuard } from 'src/autenticacion/application/service/auth/jwt-auth.guard';

@Controller('combo')
export class comboController {
  constructor(
    private readonly _igdtPdtService: comboService,
    private readonly commandBus: CommandBus,
  ) {}
  
  @Get('/all')
  @UseGuards(JwtAuthGuard)
  async getAllIgdtPdt(): Promise<any> {
    return await this._igdtPdtService.getAllCombo()
  }

  @Post('/create')
  async create(
    @Body() _createIgdtPdtDto: createComboDto,
  ): Promise<any>{
    return await this._igdtPdtService.createCombo(_createIgdtPdtDto)
  }

  @Delete('/delete/:id')
  async delete(
    @Param() _createIgdtPdtDto: createComboDto,
  ): Promise<any>{
    return await this._igdtPdtService.deleteCombo(_createIgdtPdtDto)
  }

/*
 @Put('/update/:id')
  async update(
    @Param() productoId: createProductoDto,
    @Body() _createIgdtPdtDto: updateIgdtPdtDto,
  ) {
   return await  this.commandBus.execute<updateIgdtPdtcommand,createIgdtPdtDto>(
      new updateIgdtPdtcommand(productoId, _createIgdtPdtDto),
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
*/
}