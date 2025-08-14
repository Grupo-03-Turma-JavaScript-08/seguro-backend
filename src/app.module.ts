import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { UsuarioModule } from './usuario/usuario.module';
import { SeguroModule } from './seguro/seguro.module';
import { Seguro } from './seguro/entities/seguro.entity';
import { Usuario } from './usuario/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'halle1021',
      database: 'db_seguro',
      entities: [Categoria, Seguro, Usuario],
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