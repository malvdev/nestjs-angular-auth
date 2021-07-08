import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { User, CreateUserDto, UserService } from '@user';
import { LoginCredential } from '@auth/dto/login-credential.dto';
import { TokenDto } from '@auth/dto/token.dto';
import { RefreshTokenDto } from '@auth/dto/refresh-token.dto';
import { IJwtPayload } from '@auth/interfaces/jwt-payload';
import { ForgotPasswordDto } from '@auth/dto/forgot-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  async registerUser(userData: CreateUserDto): Promise<User> {
    return this._userService.createUser(userData);
  }

  async login(credential: LoginCredential): Promise<TokenDto> {
    const user = await this._userService.getUserByEmail(credential.email);

    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isMatched = await this._userService.checkPassword(
      user,
      credential.password,
    );

    if (!isMatched) {
      throw new Error('Invalid username or password');
    }

    if (!user.isActive) {
      throw new Error('Inactive user');
    }

    const authToken: TokenDto = this.generateAuthToken(user);
    return Promise.resolve(authToken);
  }

  async refreshToken(token: RefreshTokenDto): Promise<TokenDto> {
    let payload: IJwtPayload;

    try {
      payload = this._jwtService.verify(token.refreshToken);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }

    const { userId, type } = payload;

    if (type !== 'refresh') {
      throw new Error('Wrong token type');
    }

    const user = await this._userService.getUserById(userId);

    if (!user) {
      throw new Error('Invalid user');
    }

    if (!user.isActive) {
      throw new Error('Inactive user');
    }

    const authToken = this.generateAuthToken(user);
    return Promise.resolve(authToken);
  }

  private generateAuthToken(user: User): TokenDto {
    const accessPayload: IJwtPayload = {
      sub: () => user.email,
      type: 'access',
      email: user.email,
      roles: user.roles,
      userId: user.id,
    };

    const refreshPayload: IJwtPayload = {
      sub: () => user.email,
      type: 'refresh',
      userId: user.id,
    };

    const accessToken = this._jwtService.sign(accessPayload);
    const refreshToken = this._jwtService.sign(refreshPayload);

    return { accessToken, refreshToken };
  }

  async forgotPassword({ email }: ForgotPasswordDto): Promise<any> {
    const userUpdate = await this._userService.getUserByEmail(email);

    if (!userUpdate) {
      throw new Error(`Email ${email} not found`);
    }

    const passwordRand = Math.random().toString(36).slice(-8);
    userUpdate.password = bcrypt.hashSync(passwordRand, 8);

    try {
      this.sendMailForgotPassword(userUpdate.email, passwordRand);
    } catch (error) {
      throw new Error(`There was an error sending mail`);
    }

    await this._userService.updateUser(userUpdate);

    return Promise.resolve({
      message: 'New password sent to your email',
      passwordRand, // TODO: only develop mode
    });
  }

  sendMailForgotPassword(email: string, password: string): void {
    // TODO: Send mail
  }
}
