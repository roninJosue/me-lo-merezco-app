import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepositoryPort } from '../domain/user-repository.port';
import { User } from '../domain/user.entity';
import { UserOrmEntity } from './user-orm.entity';

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
  ) {}

  async create(user: User): Promise<User> {
    const userOrmEntity = this.userRepository.create(user);
    const saved = await this.userRepository.save(userOrmEntity);
    return new User(saved.id, saved.name, saved.email);
  }

  async findById(id: number): Promise<User | null> {
    const found = await this.userRepository.findOneBy({ id });
    return found ? new User(found.id, found.name, found.email) : null;
  }
}
