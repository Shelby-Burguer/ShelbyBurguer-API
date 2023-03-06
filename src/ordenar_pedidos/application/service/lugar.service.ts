import { Injectable } from '@nestjs/common';
import { Lugar } from 'src/ordenar_pedidos/domain/models/lugar';
import { ILugarRepository } from 'src/ordenar_pedidos/domain/repositories/lugar.repository.interface';
import { LugarDto } from '../dto/lugar.dto';
import { LugarMapper } from '../mappers/lugar.mapper';

@Injectable()
export class LugarService {
  constructor(
    private iLugarRepository: ILugarRepository,
    private readonly _mapper: LugarMapper,
  ) {}

  async findAll(): Promise<LugarDto[]> {
    const lugares: Lugar[] = await this.iLugarRepository.findAll();
    return lugares.map((lugar) => this._mapper.toDto(lugar));
  }

  async findById(id: string): Promise<LugarDto> {
    const lugar: Lugar = await this.iLugarRepository.findById(id);
    return this._mapper.toDto(lugar);
  }

  async findByNombre(nombre: string): Promise<LugarDto> {
    const lugar: Lugar = await this.iLugarRepository.findByNombre(nombre);
    return this._mapper.toDto(lugar);
  }

  async create(lugarDTO: LugarDto): Promise<void> {
    const lugar: Lugar = await this._mapper.toDomain(lugarDTO);
    await this.iLugarRepository.create(lugar);
  }

  async update(id: string, lugarDTO: LugarDto): Promise<void> {
    const lugar: Lugar = await this._mapper.toDomain(lugarDTO);
    await this.iLugarRepository.update(id, lugar);
  }

  async delete(id: string): Promise<void> {
    const deleteLugar: void = await this.iLugarRepository.delete(id);
    return deleteLugar;
  }
}
