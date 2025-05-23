import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersController } from './users.controller';
import { CreateUserUseCase } from '../application/create-user.use-case';
import { FindUserUseCase } from '../application/find-user.use-case';
import { User } from '../domain/user.entity';

// Mocks para los casos de uso
const mockCreateUserUseCase = {
  execute: jest.fn((name: string, email: string) =>
    Promise.resolve(new User(1, name, email)),
  ),
};
const mockFindUserUseCase = {
  execute: jest.fn((id: number) =>
    id === 1
      ? Promise.resolve(new User(1, 'Test', 'test@email.com'))
      : Promise.resolve(null),
  ),
};

describe('UsersController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: CreateUserUseCase, useValue: mockCreateUserUseCase },
        { provide: FindUserUseCase, useValue: mockFindUserUseCase },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST) debe crear un usuario', async () => {
    const userData = { name: 'Test', email: 'test@email.com' };
    const res = await request(app.getHttpServer())
      .post('/users')
      .send(userData)
      .expect(201);

    expect(res.body).toMatchObject({
      id: 1,
      name: userData.name,
      email: userData.email,
    });
    expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith(
      userData.name,
      userData.email,
    );
  });

  it('/users/:id (GET) debe devolver un usuario existente', async () => {
    const res = await request(app.getHttpServer()).get('/users/1').expect(200);
    expect(res.body).toMatchObject({
      id: 1,
      name: 'Test',
      email: 'test@email.com',
    });
    expect(mockFindUserUseCase.execute).toHaveBeenCalledWith(1);
  });

  it('/users/:id (GET) debe lanzar 404 si el usuario no existe', async () => {
    await request(app.getHttpServer()).get('/users/999').expect(404);
    expect(mockFindUserUseCase.execute).toHaveBeenCalledWith(999);
  });
});
