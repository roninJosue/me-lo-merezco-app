import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositoryAdapter } from './infrastructure/user-repository.adapter';
import { UserOrmEntity } from './infrastructure/user-orm.entity';
import { CreateUserUseCase } from './application/create-user.use-case';
import { UsersController } from './infrastructure/users.controller';
import { FindUserUseCase } from './application/find-user.use-case';
import { UserRepositoryPort } from './domain/user-repository.port';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    FindUserUseCase,
    {
      provide: UserRepositoryPort,
      useClass: UserRepositoryAdapter,
    },
    UserRepositoryAdapter,
  ],
  exports: [CreateUserUseCase, FindUserUseCase],
})
export class UsersModule {}
