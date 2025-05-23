import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../domain/user-repository.port';
import { User } from '../domain/user.entity';

@Injectable()
export class FindUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
