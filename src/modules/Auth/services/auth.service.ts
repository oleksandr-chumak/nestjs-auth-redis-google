import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { CryptService } from './crypt.service';
import { UserEntityWithoutCredentials } from '../types';
import { RegisterUserDto } from '../dto/register-user.dto';
import {
  PasswordNotMatchException,
  UserAlreadyExistException,
} from '../exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly cryptService: CryptService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntityWithoutCredentials | null> {
    const user = await this.userService.findOneBy({ email });
    if (user && (await this.cryptService.compare(password, user.password))) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async registerUser(user: RegisterUserDto) {
    const foundUser = await this.userService.findOneBy({ email: user.email });
    if (foundUser) {
      throw new UserAlreadyExistException();
    }
    if (user.password !== user.confirmPassword) {
      throw new PasswordNotMatchException();
    }
    const { confirmPassword: _, ...credentials } = user;
    const newUser = await this.userService.save({
      ...credentials,
      password: await this.cryptService.hash(user.password),
    });
    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };
  }
}
