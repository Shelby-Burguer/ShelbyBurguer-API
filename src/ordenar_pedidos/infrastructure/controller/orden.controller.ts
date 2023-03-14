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
import { readIngredienteDto } from '../../../producto_combo/application/dto/readingrediente.dto';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { allIngredienteQuery } from '../../../producto_combo/infraestructure/queryBus/allIngredientesQuery';
import { OneIngredienteQuery } from '../../../producto_combo/infraestructure/queryBus/oneIngrediente.Queryt';
import { createIngredienteDto } from '../../../producto_combo/application/dto/createIngrediente.dto';
import { createImagenIngredienteDto } from '../../../producto_combo/application/dto/createImagenIngrediente.dto';
import { createIngredientecommand } from '../../../producto_combo/infraestructure/command/createIngrediente.command';
import { createImagenIngredientecommand } from '../../../producto_combo/infraestructure/command/createImage.command';
import { updateIngredientecommand } from '../../../producto_combo/infraestructure/command/updateIngrediente.command';
import { deleteingredientecommand } from '../../../producto_combo/infraestructure/command/deleteIngrediente.comand';
import { updateIngredientelDto } from '../../../producto_combo/application/dto/updateIngrediente.dto';
import { idIngredienteDto } from '../../../producto_combo/application/dto/idIngrediente.dto';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { createIgdtPdtDto } from '../../../producto_combo/application/dto/createIgdtPdt.dto';
import { createIgdtPdtcommand } from '../../../producto_combo/infraestructure/command/createIgdtPdt.command';
import { allIgdtPdtQuery } from '../../../producto_combo/infraestructure/queryBus/allIgdtPdt.Query';
import { AllIgdtPdtIdQuery } from '../../../producto_combo/infraestructure/queryBus/AllIgdtPdtId.Query';
import { updateIgdtPdtcommand } from '../../../producto_combo/infraestructure/command/updateIgdtpdt.command';
import { createProductoDto } from '../../../producto_combo/application/dto/createProducto.dto';
import { updateIgdtPdtDto } from '../../../producto_combo/application/dto/updateIgftPdt.dto';
import { ordenService } from '../../application/service/orden.service';
import { createComboDto } from '../../../producto_combo/application/dto/createCombo.dto';
import { createOrdenIdDto } from '../../application/dto/createOrdenId.dto';

@Controller('orden')
export class ordenController {
  constructor(
    private readonly _igdtPdtService: ordenService,
  ) {}
  /*
  @Get('/all')
  async getAllIgdtPdt(): Promise<any> {
    return await this._igdtPdtService.getAllCombo()
  }
*/
  @Post('/create')
  async createId(): Promise<any> {
    return await this._igdtPdtService.createOrdenId();
  }
  /*
  @Delete('/delete/:id')
  async delete(
    @Param() _createIgdtPdtDto: createComboDto,
  ): Promise<any>{
    return await this._igdtPdtService.deleteCombo(_createIgdtPdtDto)
  }
*/
}
