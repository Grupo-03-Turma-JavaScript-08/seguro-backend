import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UsuarioLogin {
  @ApiProperty({ example: 'usuario@dominio.com' })
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  public email: string; 

  @ApiProperty({ example: 'minhasenha123' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  public senha: string;
}
