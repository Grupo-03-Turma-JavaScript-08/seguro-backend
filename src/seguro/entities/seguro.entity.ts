import { IsNotEmpty, IsNumber } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity({ name: 'tb_seguros' })
export class Seguro {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  descricao: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  origem: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  destino: string;

  @IsNumber()
  @Column({ type: 'int', nullable: false })
  duracaoDias: number;

  @IsNumber()
  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  preco: number;

  // Relacionamento com categoria
  @ManyToOne(() => Categoria, (categoria) => categoria.seguro, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  // Relacionamento com usuário
  @ManyToOne(() => Usuario, (usuario) => usuario.seguros, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;
}
