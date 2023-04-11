import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true; // No se ha aplicado el decorador Roles
        }

        const { user } = context.switchToHttp().getRequest();

        if (!user || !user.role || !requiredRoles.includes(user.role)) {
            throw new UnauthorizedException(); // El usuario no tiene los roles requeridos
        }

        return true;
    }
}