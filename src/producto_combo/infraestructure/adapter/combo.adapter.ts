import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';

import { Repository } from 'typeorm';
import { comboEntity } from '../orm/combo.orm';
import { pdt_cbEntity } from '../orm/pdt_cb.orm';
import { createComboDto } from '../../application/dto/createCombo.dto';
import { icomboRepository } from '../../application/repository/combo.repository';
import UniqueId from '../../../shared/domain/UniqueUUID';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class comboPersisteceAdapter implements icomboRepository {
  constructor(
    @InjectRepository(comboEntity)
    private readonly comboRepository: Repository<comboEntity>,
    @InjectRepository(pdt_cbEntity)
    private readonly pdt_cbRepository: Repository<pdt_cbEntity>,
  ) {}
  async getAllCombo(): Promise<any[]> {
  try {
    const combos = await this.comboRepository.find({
      relations: ['pdt_cb', 'pdt_cb.producto'],
    });

    return combos.map((combo) => ({
      combo_id: combo.combo_id,
      nombre_combo: combo.nombre_combo,
      tiempo_aprox_preparacion_combo: combo.tiempo_aprox_preparacion_combo,
      precio_unitario_combo: combo.precio_unitario_combo,
      productos: combo.pdt_cb.map((pdt_cb) => ({
        producto: pdt_cb.producto,
        cantidad_pdt_cb: pdt_cb.cantidad_pdt_cb,
      })),
    }));
      } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    } else {
      throw new InternalServerErrorException();
    }
  }
  }

  async createCombo(createComboDto: createComboDto): Promise<any> {
  try {
    // Crear un nuevo combo y guardar la información excepto los productos
    const combo = new comboEntity();
    combo.combo_id = new UniqueId().getId();
    combo.nombre_combo = createComboDto.nombre;
    combo.tiempo_aprox_preparacion_combo = createComboDto.tiempo_aprox;
    combo.precio_unitario_combo = createComboDto.precio_unitario;
    await this.comboRepository.save(combo);

    // Crear y guardar la información de cada producto y su relación con el combo
    for (const createProducto of createComboDto.producto) {
      const producto = new pdt_cbEntity();
      producto.pdt_cd_id = new UniqueId().getId();
      producto.cantidad_pdt_cb = createProducto.cantidad.toString();
      producto.producto_id = createProducto.id;
      producto.combo_id = combo.combo_id;

      await this.pdt_cbRepository.save(producto);
    }

    const combos = await this.comboRepository.findOne({
      where: { combo_id: combo.combo_id },
      relations: ['pdt_cb', 'pdt_cb.producto'],
    });

    return {
      combo_id: combos.combo_id,
      nombre_combo: combos.nombre_combo,
      tiempo_aprox_preparacion_combo: combos.tiempo_aprox_preparacion_combo,
      precio_unitario_combo: combos.precio_unitario_combo,
      productos: combos.pdt_cb.map((pdt_cb) => ({
        producto: pdt_cb.producto,
        cantidad_pdt_cb: pdt_cb.cantidad_pdt_cb,
      })),
    };
    } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    } else {
      throw new InternalServerErrorException();
    }
  }
  }

  async deleteCombo(deleteComboDto: createComboDto): Promise<any> {
  try {
    await this.comboRepository.delete(deleteComboDto.id);
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
