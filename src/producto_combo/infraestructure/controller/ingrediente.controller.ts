import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { readIngredienteDto } from '../../application/dto/readingrediente.dto';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { allIngredienteQuery } from '../queryBus/allIngredientesQuery';
/*import { createCollectionDto } from '../../application/dto/collection.create.dto';
import { createcollectioncommand } from '../commad/createCollection.commad';
import { updateCollectioncommand } from '../commad/updateCollection.command';
import { updateCollectionDto } from '../../application/dto/updateCollection.dto';
import { idCollectionDto } from '../../application/dto/idCollection.dto';*/

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

/*@Post('/create')
  async create(
    @Body() _createCollectionDto: createCollectionDto,
  ): Promise<any> {
    return await this.commandBus.execute<
      createcollectioncommand,
      createCollectionDto
    >(new createcollectioncommand(_createCollectionDto));
  }

 @Patch('/update/:id')
  async update(
    @Param() collectionId: idCollectionDto,
    @Body() collection: updateCollectionDto,
  ): Promise<any> {
   return await  this.commandBus.execute<updateCollectioncommand,updateCollectionDto>(
      new updateCollectioncommand(collection, collectionId),
    );
  } */
}
