import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/ordenar_pedidos/domain/models/cliente';
import { IClienteRepository } from 'src/ordenar_pedidos/domain/repositories/cliente-repository.interface';
import { Repository } from 'typeorm/repository/Repository';
import UniqueId from '../../../shared/domain/UniqueUUID';
import idVo from '../../../shared/domain/vo/id';
import ClienteAdapter from '../adapters/cliente.adapter';
import { ClienteEntity } from '../entities/cliente.entity';

export class ClienteRepositoryImpl implements IClienteRepository {
  constructor(
    @InjectRepository(ClienteEntity)
    private readonly clienteRepository: Repository<ClienteEntity>,
  ) {}

  async findByText(text: string, tipo: string): Promise<Cliente | undefined> {
    const entity = await this.clienteRepository.findOne({
      where: { [tipo]: text },
    });
    return ClienteAdapter.toDomain(entity);
  }

  async findAllByNombreCompleto(
    nombre: string,
    apellido: string,
  ): Promise<Cliente[] | undefined> {
    const entities = await this.clienteRepository
      .createQueryBuilder('entity')
      .where('LOWER(entity.nombre_cliente) LIKE LOWER(:nombre)', {
        nombre: `%${nombre}%`,
      })
      .andWhere('LOWER(entity.apellido_cliente) LIKE LOWER(:apellido)', {
        apellido: `%${apellido}%`,
      })
      .getMany();
    return entities.map((entity) => ClienteAdapter.toDomain(entity));
  }

  async findAll(): Promise<Cliente[]> {
    const entities = await this.clienteRepository.find();
    return entities.map((entity) => ClienteAdapter.toDomain(entity));
  }

  async create(cliente: Cliente): Promise<void> {
    cliente.id = idVo.create(new UniqueId().getId());
    const entity = ClienteAdapter.toEntityForCreate(cliente);
    await this.clienteRepository.save(entity);
  }

  async update(id: string, cliente: Cliente): Promise<void> {
    const entity = ClienteAdapter.toEntity(cliente);
    await this.clienteRepository.update(id, entity);
  }

  async delete(id: string): Promise<void> {
    await this.clienteRepository.delete(id);
  }
}
