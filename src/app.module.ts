import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ingredienteModule } from './producto_combo/infraestructure/ingrediente.module';
import { LugarModule } from './ordenar_pedidos/infrastructure/lugar.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      //validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ingredienteModule, ConfigModule],
      inject: [ConfigService],
      //entities: [],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';
        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          type: 'postgres',
          synchronize: false,
          autoLoadEntities: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
    CqrsModule,
    ingredienteModule,
    LugarModule,
    // collectionModule,
    // styleModule,
    // modelModule,
    // orderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
