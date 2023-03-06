import { Lugar } from 'src/ordenar_pedidos/domain/models/lugar';
import { LugarRepository } from 'src/ordenar_pedidos/domain/repositories/lugar.repository.interface';
import { Repository } from 'typeorm/repository/Repository';

export class LugarRepositoryImpl implements LugarRepository {
  constructor(private readonly lugarRepository: Repository<Lugar>) {}

  async findById(id: string): Promise<Lugar | undefined> {
    return this.lugarRepository.findOne(id);
  }

  async findByNombre(nombre: string): Promise<Lugar | undefined> {
    return this.lugarRepository.findOne({ where: { nombre } });
  }

  async findAll(): Promise<Lugar[]> {
    return this.lugarRepository.find();
  }

  async create(lugar: Lugar): Promise<Lugar> {
    return this.lugarRepository.save(lugar);
  }

  async update(lugar: Lugar): Promise<Lugar> {
    return this.lugarRepository.save(lugar);
  }

  async delete(id: string): Promise<void> {
    await this.lugarRepository.delete(id);
  }
}
