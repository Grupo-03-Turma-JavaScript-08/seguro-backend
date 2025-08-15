import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Seguro } from '../entities/seguro.entity';

// Função de cálculo como CONSTANTE
const calcularPrecoFinal = (seguro: Seguro): number => {
  let valorTotal =
    Number(seguro.preco ?? 0) * Math.max(1, Number(seguro.duracaoDias ?? 1));
  const destino = (seguro.destino ?? '').toLowerCase();
  const aplicaAcrecimo = destino.includes('eua') || destino.includes('canada');
  if (aplicaAcrecimo) {
    valorTotal *= 1.2; // +20%
  }
  return Math.round(valorTotal * 100) / 100;
};

@Injectable()
export class SeguroService {
  constructor(
    @InjectRepository(Seguro)
    private seguroRepository: Repository<Seguro>,
  ) {}

  async findAll(): Promise<Seguro[]> {
    return await this.seguroRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Seguro> {
    const seguro = await this.seguroRepository.findOne({
      where: { id },
      relations: { categoria: true },
    });

    if (!seguro)
      throw new HttpException('Seguro não encontrado!', HttpStatus.NOT_FOUND);

    return seguro;
  }

  async findAllByNome(nome: string): Promise<Seguro[]> {
    return await this.seguroRepository.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: { categoria: true },
    });
  }

  async create(seguro: Seguro): Promise<Seguro> {
    (seguro as any).precoFinal = calcularPrecoFinal(seguro);
    return await this.seguroRepository.save(seguro);
  }

  async update(seguro: Seguro): Promise<Seguro> {
    await this.findById(seguro.id);
    return await this.seguroRepository.save(seguro);
  }

  async delete(id: number): Promise<void> {
    const existente = await this.seguroRepository.findOneBy({ id });
    if (!existente) throw new NotFoundException('Seguro não encontrado');
    await this.seguroRepository.delete(id);
  }
}
