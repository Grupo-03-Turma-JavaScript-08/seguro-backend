import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants/constants';
import { UsuarioService } from '../../usuario/services/usuario.service';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usuarioService: UsuarioService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const auth = req?.headers?.authorization as string | undefined;
          if (!auth || typeof auth !== 'string') return null;
          // Remove um ou mais prefixos 'Bearer ' no início
          const normalized = auth.replace(/^(Bearer\s+)+/i, '').trim();
          return normalized || null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<Usuario> {
    console.log('JwtStrategy.validate payload:', payload);
    try {
      const usuario = await this.usuarioService.findById(payload.sub);
      console.log('JwtStrategy.validate usuario encontrado:', usuario ? { id: usuario.id, email: usuario.email } : null);
      return usuario;
    } catch (e) {
      console.error('JwtStrategy.validate erro ao buscar usuário:', e?.message || e);
      throw e;
    }
  }
}
