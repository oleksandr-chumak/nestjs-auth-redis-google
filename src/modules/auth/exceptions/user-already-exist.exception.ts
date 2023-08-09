import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExistException extends BadRequestException {
  constructor() {
    super('User with this email address is already registered');
  }
}
