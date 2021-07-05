import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User } from '@user/entity/user.entity';
import { CreateUserDto } from '@user/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = userData.name;
    user.email = userData.email;
    user.roles = ['user'];
    user.isActive = true;
    user.password = await this.hashPassword(userData.password);

    try {
      return this._userRepository.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error(`User already exists with email ${user.name}`);
      }

      throw error;
    }
  }

  getUserById(id: number): Promise<User> {
    return this._userRepository.findOne(id);
  }

  getUserByEmail(email): Promise<User> {
    return this._userRepository.findOne({ email });
  }

  getAllUsers(): Promise<User[]> {
    return this._userRepository.find();
  }

  hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return reject(null);
        }

        bcrypt.hash(password, salt, (err2, hash) => {
          return err2 ? reject(null) : resolve(hash);
        });
      });
    });
  }

  checkPassword(user: User, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (error, ok) => {
        return error || !ok ? resolve(false) : resolve(true);
      });
    });
  }
}
