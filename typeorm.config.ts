import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { LugarEntity } from './src/ordenar_pedidos/infrastructure/entities/lugar.entity';
import { ClienteEntity } from './src/ordenar_pedidos/infrastructure/entities/cliente.entity';
import { comboEntity } from './src/producto_combo/infraestructure/orm/combo.orm';
import { igdt_pdtEntity } from './src/producto_combo/infraestructure/orm/igdt_pdt.orm';
import { ingredienteEntity } from './src/producto_combo/infraestructure/orm/ingrediente.orm';
import { pdt_cbEntity } from './src/producto_combo/infraestructure/orm/pdt_cb.orm';
import { productoEntity } from './src/producto_combo/infraestructure/orm/producto.orm';
import { MigrationProductoYLugar1678210783717 } from './migrations/1678210783717-migr_producto_lugar';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [
    LugarEntity,
    ClienteEntity,
    comboEntity,
    igdt_pdtEntity,
    ingredienteEntity,
    pdt_cbEntity,
    productoEntity,
  ],
  migrations: [MigrationProductoYLugar1678210783717],
});
