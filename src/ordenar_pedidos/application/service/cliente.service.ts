import { Inject, Injectable } from '@nestjs/common';
import { Cliente } from '../../domain/models/cliente';
import { IClienteRepository } from '../../domain/repositories/cliente-repository.interface';
import { ClienteDTO } from '../dto/cliente.dto';
import { ClienteMapper } from '../mappers/cliente.mapper';

@Injectable()
export class ClienteService {
  constructor(
    @Inject('IClienteRepository')
    private readonly iClienteRepository: IClienteRepository,
    private readonly _mapper: ClienteMapper,
  ) {}

  async findByText(text: string, tipo: string): Promise<ClienteDTO> {
    const cliente: Cliente = await this.iClienteRepository.findByText(
      text,
      tipo,
    );
    return this._mapper.toDto(cliente);
  }

  async findAllByNombreCompleto(
    nombre: string,
    apellido: string,
  ): Promise<ClienteDTO[] | undefined> {
    const clientes: Cliente[] =
      await this.iClienteRepository.findAllByNombreCompleto(nombre, apellido);
    return clientes.map((cliente) => this._mapper.toDto(cliente));
  }

  async findAll(): Promise<ClienteDTO[]> {
    const clientes: Cliente[] = await this.iClienteRepository.findAll();
    return clientes.map((cliente) => this._mapper.toDto(cliente));
  }

  async create(clienteDTO: ClienteDTO): Promise<void> {
    const cliente: Cliente = this._mapper.toDomain(clienteDTO);
    await this.iClienteRepository.create(cliente);
  }

  async update(id: string, clienteDTO: ClienteDTO): Promise<void> {
    const cliente: Cliente = this._mapper.toDomain(clienteDTO);
    await this.iClienteRepository.update(id, cliente);
  }

  async delete(id: string): Promise<void> {
    const deleteCliente: void = await this.iClienteRepository.delete(id);
    return deleteCliente;
  }
}
