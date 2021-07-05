import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(320)
  @ApiProperty()
  readonly email: string;

  @MinLength(8)
  @ApiProperty({
    minLength: 8,
  })
  readonly password: string;
}
