import { IsNotEmpty, IsNumber } from 'class-validator';
import {
  Column,
  Decimal128,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';

//Criando a tabela produtos
@Entity({ name: 'tb_seguros' })

// Atributos da tabela produtos
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

  
  @ManyToOne(() => Categoria, (categoria) => categoria.seguro, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;
}
