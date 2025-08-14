import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { Seguro } from '../../seguro/entities/seguro.entity';


@Entity('tb_categorias')
export class Categoria {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  @ApiProperty()
  @IsNotEmpty()
  nome: string;

  @Column({ length: 255 })
  @ApiProperty()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ type: () => Seguro })
  @OneToMany(() => Seguro, (seguro) => seguro.categoria, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'seguro_id' })
  seguro: Seguro[];
}