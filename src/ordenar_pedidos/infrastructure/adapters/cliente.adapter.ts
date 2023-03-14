import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ClienteDTO } from 'src/ordenar_pedidos/application/dto/cliente.dto';
import { Cliente } from 'src/ordenar_pedidos/domain/models/cliente';
import { toDTO, toEntity } from 'src/shared/application/dto.mapper';
import { ClienteEntity } from '../entities/cliente.entity';

@Injectable()
export default class ClienteAdapter {
  public static toDomain(entity: ClienteEntity): Cliente {
    return toEntity(entity, Cliente);
  }

  public static toEntity(cliente: Cliente): ClienteEntity {
    return toEntity(cliente, ClienteEntity);
  }

  static toEntityForCreate(cliente: Cliente): ClienteEntity {
    const clienteEntity = toEntity(cliente, ClienteEntity);
    clienteEntity.id_cliente = cliente.id.getId(); // Aquí se transforma el Value Object a string
    return clienteEntity;
  }

  public static toDto(entity: ClienteEntity): ClienteDTO {
    return plainToClass(ClienteDTO, toDTO(entity));
  }
}
