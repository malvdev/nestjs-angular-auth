import {
  Get,
  UseGuards,
  Controller,
  HttpStatus,
  HttpException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AuthUser, RolesGuard, Roles } from '@shared';
import { IAuthUser } from '@user/interfaces';
import { User } from '@user/entity/user.entity';
import { UserService } from '@user/service/user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly _service: UserService) {}

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('user', 'admin')
  async getMe(@AuthUser() user: IAuthUser): Promise<User> {
    try {
      return await this._service.getUserByEmail(user.email);
    } catch (error) {
      throw new HttpException(user, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllUser(): Promise<User[]> {
    try {
      return await this._service.getAllUsers();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
