import { Injectable } from '@nestjs/common';
import { GenericMapper } from '../../../shared/application/generic.mapper';
import { Cliente } from '../../domain/models/cliente';
import { ClienteDTO } from '../dto/cliente.dto';

@Injectable()
export class ClienteMapper extends GenericMapper<ClienteDTO, Cliente> {
  constructor() {
    super(ClienteDTO, Cliente);
  }
}
