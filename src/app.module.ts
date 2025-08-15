import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { SeguroModule } from './seguro/seguro.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_seguro_viagem', 
      autoLoadEntities: true, // carrega automaticamente todas as entidades
      synchronize: true,
      logging: true,
    }),
    CategoriaModule,
    SeguroModule,
    UsuarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}