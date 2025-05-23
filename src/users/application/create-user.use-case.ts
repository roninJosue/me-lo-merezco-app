import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../domain/user-repository.port';
import { User } from '../domain/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(user: CreateUserDto): Promise<User> {
    try {
      return await this.userRepository.create(
        new User(0, user.name, user.email),
      );
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already in use');
      }
      throw error;
    }
  }
}
