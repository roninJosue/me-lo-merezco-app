import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserUseCase } from '../application/create-user.use-case';
import { FindUserUseCase } from '../application/find-user.use-case';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../domain/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserUseCase: FindUserUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.createUserUseCase.execute(body);
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<User> {
    const user = await this.findUserUseCase.execute(Number(id));

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return user;
  }
}
