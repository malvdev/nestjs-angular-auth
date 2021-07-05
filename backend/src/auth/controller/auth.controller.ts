import {
  Inject,
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Logger } from 'winston';

import { CreateUserDto, User } from '@user';
import { AuthService, TokenDto, LoginCredential, RefreshTokenDto } from '@auth';

@Controller()
export class AuthController {
  constructor(
    @Inject('winston')
    private readonly _logger: Logger,
    private readonly _service: AuthService,
  ) {}

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() userDto: CreateUserDto): Promise<User> {
    try {
      return await this._service.registerUser(userDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() credential: LoginCredential): Promise<TokenDto> {
    try {
      return await this._service.login(credential);
    } catch (error) {
      this._logger.warn('Login attempt failed', credential);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('refresh-token')
  async refreshToken(@Body() token: RefreshTokenDto): Promise<TokenDto> {
    try {
      return this._service.refreshToken(token);
    } catch (error) {
      this._logger.warn('Refresh token attempt failed', token);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
