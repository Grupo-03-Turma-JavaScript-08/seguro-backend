import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { SeguroService } from '../services/seguro.service';
import { Seguro } from '../entities/seguro.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Controller('/seguros')
export class SeguroController {
  constructor(private readonly seguroService: SeguroService) {}

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findAllByNome(@Param('nome') nome: string): Promise<Seguro[]> {
    return this.seguroService.findAllByNome(nome);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/usuario/:id')
  @HttpCode(HttpStatus.OK)
  findByUsuario(@Param('id', ParseIntPipe) id: number): Promise<Seguro[]> {
    return this.seguroService.findByUsuarioId(id);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Seguro> {
    return this.seguroService.findById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Seguro[]> {
    return this.seguroService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() seguro: Seguro, @Req() req: Request): Promise<Seguro> {
    console.log('REQ.USER:', req.user);

    const usuario = req.user as any;
    if (!usuario?.id) {
      console.log('⚠️ Nenhum ID de usuário encontrado no token');
    } else {
      console.log('✅ Associando seguro ao usuário ID:', usuario.id);
      seguro.usuario = { id: usuario.id } as any;
    }

    return this.seguroService.create(seguro);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() seguro: Seguro): Promise<Seguro> {
    return this.seguroService.update(seguro);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deletar(@Param('id', ParseIntPipe) id: number) {
    await this.seguroService.delete(id);
    return { mensagem: 'Seguro removido com sucesso!' };
  }
}

