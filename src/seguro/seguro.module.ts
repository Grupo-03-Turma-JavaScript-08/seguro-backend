import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seguro } from './entities/seguro.entity';
import { SeguroService } from './services/seguro.service';
import { SeguroController } from './controllers/seguro.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Seguro])],
  providers: [SeguroService],
  controllers: [SeguroController],
  exports: [SeguroService],
})
export class SeguroModule {}
