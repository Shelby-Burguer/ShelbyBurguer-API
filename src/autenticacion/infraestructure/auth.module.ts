import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../application/service/constants';
import { autenticacionService } from '../application/service/autenticacion.service';

@Module({
  imports: [

    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '60s'}
    })],
  providers: [autenticacionService],
  exports: [autenticacionService]
})
export class AuthModule {}