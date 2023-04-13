import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './auth/constants';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { autenticacionService } from './autenticacion.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: autenticacionService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload.userId);
    console.log('Entro en validate');
    console.log('Entro en validate', user);
    console.log('Entro en validate', payload);
    if (!user) {
      console.log('Entro en user');
      throw new UnauthorizedException();
    }
    if (!user.roles || !user.roles.role.nombre_roles === payload.role) {
      console.log('entro en roles');
      throw new ForbiddenException();
    }
    console.log('Llego hasta aqui');
    return { userId: payload.userId, role: payload.role };
  }
}
