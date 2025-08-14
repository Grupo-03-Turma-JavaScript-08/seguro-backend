import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      select: ['id', 'nome', 'email', 'tipo'],
      relations: ['seguros'],
    });
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });

    if (!usuario) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    return usuario;
  }

  async findByNome(nome: string): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: { nome: ILike(`%${nome}%`) },
    });
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { email } });
  }
async create(usuario: Usuario): Promise<Usuario> {
    const existe = await this.findByEmail(usuario.email);

    if (existe) {
      throw new HttpException('E-mail já cadastrado!', HttpStatus.BAD_REQUEST);
    }

    return this.usuarioRepository.save(usuario);
  }

  async update(usuario: Usuario): Promise<Usuario> {
    if (!usuario.id) {
      throw new HttpException('Id do usuário não informado!', HttpStatus.BAD_REQUEST);
    }

    await this.findById(usuario.id);

    const emailJaUsado = await this.findByEmail(usuario.email);
    if (emailJaUsado && emailJaUsado.id !== usuario.id) {
      throw new HttpException('E-mail já cadastrado!', HttpStatus.BAD_REQUEST);
    }

    return this.usuarioRepository.save(usuario);
  }


  async delete(id: number): Promise<void> {
    const usuario = await this.findById(id);
    if (!usuario) {
      throw new HttpException('Usuário não encontrado para exclusão.', HttpStatus.NOT_FOUND);
    }

    await this.usuarioRepository.delete(id);
  }
}