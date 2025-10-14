import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers['authorization'];
    console.log('JwtAuthGuard.canActivate Authorization header:', authHeader);
    return super.canActivate(context) as any;
  }

  handleRequest(err: any, user: any, info: any, context: any, status?: any) {
    if (err) console.error('JwtAuthGuard.handleRequest error:', err);
    if (info) console.warn('JwtAuthGuard.handleRequest info:', info);
    console.log('JwtAuthGuard.handleRequest user:', user);
    return super.handleRequest(err, user, info, context, status);
  }
}
