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
import { migr_carrito_1678815849795 } from './migrations/1678815849795-migr_carrito';
import { carritoEntity } from './src/carrito/infraestructure/entities/carrito.orm';
import { OrdenEntity } from './src/orden/infraestructure/entities/orden.orm';
import { pdtcb_odEntity } from './src/orden/infraestructure/entities/pdtcb_od.orm';

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
    carritoEntity,
    OrdenEntity,
    comboEntity,
    igdt_pdtEntity,
    ingredienteEntity,
    pdt_cbEntity,
    productoEntity,
    OrdenEntity,
    pdtcb_odEntity,
  ],
  migrations: [migr_carrito_1678815849795],
});
