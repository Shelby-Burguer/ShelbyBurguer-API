import { iIngredienteRepository } from '../../application/repository/iIngrediente.repository';
import { Repository } from 'typeorm';
import { ingredienteEntity } from '../orm/ingrediente.orm';
import { InjectRepository } from '@nestjs/typeorm';

export class ingredientePersisteceAdapter implements iIngredienteRepository {
  constructor(
    @InjectRepository(ingredienteEntity)
    private readonly ingredienteRepository: Repository<ingredienteEntity>,
  ) {}
  async getAllIngrediente(): Promise<ingredienteEntity[]> {
    const ingrediente: ingredienteEntity[] =
      await this.ingredienteRepository.find();
    return ingrediente;
  }

  async getOneIngrediente(
    _ingredienteEntity: ingredienteEntity,
  ): Promise<ingredienteEntity> {
    const id = _ingredienteEntity.ingrediente_id;
    const ingrediente: ingredienteEntity =
      await this.ingredienteRepository.findOne({
        where: { ingrediente_id: id },
      });
    return ingrediente;
  }

  async createIngrediente(
    _ingredienteEntity: ingredienteEntity,
  ): Promise<ingredienteEntity> {
    const ingrediente: ingredienteEntity =
      await this.ingredienteRepository.save({
        ingrediente_id: _ingredienteEntity.ingrediente_id,
        nombre_ingrediente: _ingredienteEntity.nombre_ingrediente,
        unidad_ingrediente: _ingredienteEntity.unidad_ingrediente,
        proteina_ingrediente: _ingredienteEntity.proteina_ingrediente,
        extra: _ingredienteEntity.extra,
        objecturl_ingrediente: _ingredienteEntity.objecturl_ingrediente,
      });
    console.log("salida ingrediente",ingrediente);
    return ingrediente;
  }

  async createImagenIngrediente(
    _ingredienteEntity: ingredienteEntity,
  ): Promise<any> {
    await this.ingredienteRepository.update(_ingredienteEntity.ingrediente_id, {
      nombre_imagen: _ingredienteEntity.nombre_imagen,
      datos_imagen: _ingredienteEntity.datos_imagen,
    });

    const ingrediente: ingredienteEntity =
      await this.ingredienteRepository.findOne({
        where: { ingrediente_id: _ingredienteEntity.ingrediente_id },
      });

    return ingrediente;
  }

  async updateIngrediente(
    _ingredienteEntity: ingredienteEntity,
  ): Promise<ingredienteEntity> {
    await this.ingredienteRepository.update(_ingredienteEntity.ingrediente_id, {
      nombre_ingrediente: _ingredienteEntity.nombre_ingrediente,
      unidad_ingrediente: _ingredienteEntity.unidad_ingrediente,
      proteina_ingrediente: _ingredienteEntity.proteina_ingrediente,
      extra: _ingredienteEntity.extra,
    });

    const ingrediente: ingredienteEntity =
      await this.ingredienteRepository.findOne({
        where: { ingrediente_id: _ingredienteEntity.ingrediente_id },
      });
    return ingrediente;
  }

  async deleteIngrediente(_ingredienteEntity: ingredienteEntity): Promise<any> {
    await this.ingredienteRepository.delete(_ingredienteEntity.ingrediente_id);
    const messageDelete = 'Eiminación realizada';

    return messageDelete;
  }
}
