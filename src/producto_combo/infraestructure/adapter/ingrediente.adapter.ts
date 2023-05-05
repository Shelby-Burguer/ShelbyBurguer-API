import { iIngredienteRepository } from '../../application/repository/iIngrediente.repository';
import { Repository } from 'typeorm';
import { ingredienteEntity } from '../orm/ingrediente.orm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, InternalServerErrorException } from '@nestjs/common';

export class ingredientePersisteceAdapter implements iIngredienteRepository {
  constructor(
    @InjectRepository(ingredienteEntity)
    private readonly ingredienteRepository: Repository<ingredienteEntity>,
  ) {}
  async getAllIngrediente(): Promise<ingredienteEntity[]> {
    try {
      const ingrediente: ingredienteEntity[] =
        await this.ingredienteRepository.find();
      return ingrediente;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getOneIngrediente(
    _ingredienteEntity: ingredienteEntity,
  ): Promise<ingredienteEntity> {
    try {
      const id = _ingredienteEntity.ingrediente_id;
      const ingrediente: ingredienteEntity =
        await this.ingredienteRepository.findOne({
          where: { ingrediente_id: id },
        });
      return ingrediente;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async createIngrediente(
    _ingredienteEntity: ingredienteEntity,
  ): Promise<ingredienteEntity> {
    console.log('salida ingrediente', _ingredienteEntity);
    try {
      const ingrediente: ingredienteEntity =
        await this.ingredienteRepository.save({
          ingrediente_id: _ingredienteEntity.ingrediente_id,
          nombre_ingrediente: _ingredienteEntity.nombre_ingrediente,
          unidad_ingrediente: _ingredienteEntity.unidad_ingrediente,
          proteina_ingrediente: _ingredienteEntity.proteina_ingrediente,
          extra: _ingredienteEntity.extra,
          objecturl_ingrediente: _ingredienteEntity.objecturl_ingrediente,
        });
     
      return ingrediente;
    } catch (error) {
     console.log('salida ingrediente');
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async createImagenIngrediente(
    _ingredienteEntity: ingredienteEntity,
  ): Promise<any> {
    try {
      await this.ingredienteRepository.update(
        _ingredienteEntity.ingrediente_id,
        {
          nombre_imagen: _ingredienteEntity.nombre_imagen,
          datos_imagen: _ingredienteEntity.datos_imagen,
        },
      );

      const ingrediente: ingredienteEntity =
        await this.ingredienteRepository.findOne({
          where: { ingrediente_id: _ingredienteEntity.ingrediente_id },
        });

      return ingrediente;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateIngrediente(
    _ingredienteEntity: ingredienteEntity,
  ): Promise<ingredienteEntity> {
    try {
      await this.ingredienteRepository.update(
        _ingredienteEntity.ingrediente_id,
        {
          nombre_ingrediente: _ingredienteEntity.nombre_ingrediente,
          unidad_ingrediente: _ingredienteEntity.unidad_ingrediente,
          proteina_ingrediente: _ingredienteEntity.proteina_ingrediente,
          extra: _ingredienteEntity.extra,
        },
      );

      const ingrediente: ingredienteEntity =
        await this.ingredienteRepository.findOne({
          where: { ingrediente_id: _ingredienteEntity.ingrediente_id },
        });
      return ingrediente;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteIngrediente(_ingredienteEntity: ingredienteEntity): Promise<any> {
    try {
      await this.ingredienteRepository.delete(
        _ingredienteEntity.ingrediente_id,
      );
      const messageDelete = 'Eiminación realizada';

      return messageDelete;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
