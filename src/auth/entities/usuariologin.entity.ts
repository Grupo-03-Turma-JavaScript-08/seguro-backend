import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UsuarioLogin {
  @ApiProperty()
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  public usuario: string;

  @ApiProperty({ example: 'minhasenha123' })
  @IsString()
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  public senha: string;
}