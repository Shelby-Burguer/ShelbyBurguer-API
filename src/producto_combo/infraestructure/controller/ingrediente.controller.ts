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
import { createIngredienteDto } from '../../application/dto/createIngrediente.dto';
import { createIngredientecommand } from '../command/createIngrediente.command';
import { updateIngredientecommand } from '../command/updateIngrediente.command';
import { deleteingredientecommand } from '../command/deleteIngrediente.comand';
import { updateIngredientelDto } from '../../application/dto/updateIngrediente.dto';
import { idIngredienteDto } from '../../application/dto/idIngrediente.dto';

@Controller('ingrediente')
export class ingredienteController {
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

@Post('/create')
  async create(
    @Body() _createIngredientenDto: createIngredienteDto,
  ): Promise<any>{
    return await this.commandBus.execute<
      createIngredientecommand,
      createIngredienteDto
    >(new createIngredientecommand(_createIngredientenDto));
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
}
