import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginCredential {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @MinLength(8)
  @ApiProperty()
  readonly password: string;
}
