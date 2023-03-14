import { Cliente } from '../models/cliente';

export interface IClienteRepository {
  findByText(text: string, tipo: string): Promise<Cliente | undefined>; // tipo: id, cedula, telefono
  findAllByNombreCompleto(
    nombre: string,
    apellido: string,
  ): Promise<Cliente[] | undefined>;
  findAll(): Promise<Cliente[]>;
  create(cliente: Cliente): Promise<void>;
  update(id: string, cliente: Cliente): Promise<void>;
  delete(id: string): Promise<void>;
}
