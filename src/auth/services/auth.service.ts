import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './../../usuario/services/usuario.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuariologin.entity';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const usuario = await this.usuarioService.findByEmail(email);

    if (!usuario)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    const senhaValida = await this.bcrypt.compararSenhas(
      password,
      usuario.senha,
    );

    if (senhaValida) {
      const { senha, ...result } = usuario;
      return result;
    }

    return null;
  }

  async login(usuarioLogin: UsuarioLogin) {
    const usuario = await this.usuarioService.findByEmail(usuarioLogin.email);

    if (!usuario) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    const payload = { sub: usuario.id, email: usuario.email };

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}
