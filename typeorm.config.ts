import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { LugarEntity } from './src/ordenar_pedidos/infrastructure/entities/lugar.entity';
import { ClienteEntity } from './src/ordenar_pedidos/infrastructure/entities/cliente.entity';
import { MigrationLugar1678136053882 } from './migrations/1678136053882-migration_lugar';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [LugarEntity, ClienteEntity],
  migrations: [MigrationLugar1678136053882],
});
