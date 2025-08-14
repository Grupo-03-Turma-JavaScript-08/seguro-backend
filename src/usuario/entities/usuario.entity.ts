import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Length,
  MinLength,
} from 'class-validator';
import { Seguro } from '../../seguro/entities/seguro.entity';

export enum UsuarioTipo {
  ADMIN = 'ADMIN',
  CLIENTE = 'CLIENTE',
}

@Entity('tb_usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Length(2, 120)
  @Column({ length: 120 })
  nome: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @MinLength(6)
  @Column()
  senha: string;

  @IsEnum(UsuarioTipo)
  @Column({ type: 'enum', enum: UsuarioTipo, default: UsuarioTipo.CLIENTE })
  tipo: UsuarioTipo;

  @OneToMany(() => Seguro, (seguro) => seguro.categoria, { cascade: false })
  seguros: Seguro[];
}
