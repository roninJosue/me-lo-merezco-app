import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CategoriesController } from './categories.controller';
import { CreateCategoryUseCase } from '../application/create-category.use-case';
import { UpdateCategoryUseCase } from '../application/update-category.use-case';
import { DeleteCategoryUseCase } from '../application/delete-category.use-case';
import { GetCategoryByIdUseCase } from '../application/get-category-by-id.use-case';
import { GetAllCategoriesUseCase } from '../application/get-all-categories.use-case';
import { createTestApp } from '../../../test/setup';

// Mocks for use cases
const mockCreateCategoryUseCase = {
  execute: jest.fn((categoryDto) => Promise.resolve({ id: 1 })),
};

const mockUpdateCategoryUseCase = {
  execute: jest.fn((request) => Promise.resolve()),
};

const mockDeleteCategoryUseCase = {
  execute: jest.fn((id) => Promise.resolve()),
};

const mockGetCategoryByIdUseCase = {
  execute: jest.fn((id) =>
    Promise.resolve({
      id: 1,
      name: 'Test Category',
      description: 'Test Description',
      color: '#FF5733',
    }),
  ),
};

const mockGetAllCategoriesUseCase = {
  execute: jest.fn(() =>
    Promise.resolve([
      {
        id: 1,
        name: 'Test Category 1',
        description: 'Test Description 1',
        color: '#FF5733',
      },
      {
        id: 2,
        name: 'Test Category 2',
        description: 'Test Description 2',
        color: '#33FF57',
      },
    ]),
  ),
};

describe('CategoriesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        { provide: CreateCategoryUseCase, useValue: mockCreateCategoryUseCase },
        { provide: UpdateCategoryUseCase, useValue: mockUpdateCategoryUseCase },
        { provide: DeleteCategoryUseCase, useValue: mockDeleteCategoryUseCase },
        {
          provide: GetCategoryByIdUseCase,
          useValue: mockGetCategoryByIdUseCase,
        },
        {
          provide: GetAllCategoriesUseCase,
          useValue: mockGetAllCategoriesUseCase,
        },
      ],
    }).compile();

    app = await createTestApp(moduleRef);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('/categories (POST) should create a category', async () => {
    const categoryData = {
      name: 'Test Category',
      description: 'Test Description',
      color: '#FF5733',
    };

    const res = await request(app.getHttpServer())
      .post('/categories')
      .send(categoryData)
      .expect(201);

    expect(res.body).toMatchObject({
      id: 1,
      success: true,
    });
    expect(mockCreateCategoryUseCase.execute).toHaveBeenCalledWith(
      categoryData,
    );
  });

  it('/categories/:id (PUT) should update a category', async () => {
    const categoryId = 1;
    const updateData = {
      name: 'Updated Category',
      description: 'Updated Description',
      color: '#33FF57',
    };

    const res = await request(app.getHttpServer())
      .put(`/categories/${categoryId}`)
      .send(updateData)
      .expect(200);

    expect(res.body).toMatchObject({
      success: true,
    });
    expect(mockUpdateCategoryUseCase.execute).toHaveBeenCalledWith({
      id: categoryId,
      ...updateData,
    });
  });

  it('/categories/:id (DELETE) should delete a category', async () => {
    const categoryId = 1;

    const res = await request(app.getHttpServer())
      .delete(`/categories/${categoryId}`)
      .expect(200);

    expect(res.body).toMatchObject({
      success: true,
    });
    expect(mockDeleteCategoryUseCase.execute).toHaveBeenCalledWith(categoryId);
  });

  it('/categories (POST) should validate required fields', async () => {
    const invalidCategoryData = {
      // Missing name
      description: 'Test Description',
      color: '#FF5733',
    };

    const res = await request(app.getHttpServer())
      .post('/categories')
      .send(invalidCategoryData)
      .expect(400);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message.some((msg: string) => msg.includes('name'))).toBe(
      true,
    );
    expect(res.body.statusCode).toBe(400);
    expect(mockCreateCategoryUseCase.execute).not.toHaveBeenCalled();
  });

  it('/categories (POST) should validate color format', async () => {
    const invalidCategoryData = {
      name: 'Test Category',
      description: 'Test Description',
      color: 'invalid-color', // Not a hex color
    };

    const res = await request(app.getHttpServer())
      .post('/categories')
      .send(invalidCategoryData)
      .expect(400);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message.some((msg: string) => msg.includes('color'))).toBe(
      true,
    );
    expect(res.body.statusCode).toBe(400);
    expect(mockCreateCategoryUseCase.execute).not.toHaveBeenCalled();
  });

  it('/categories/:id (GET) should get a category by id', async () => {
    const categoryId = 1;
    const expectedCategory = {
      id: 1,
      name: 'Test Category',
      description: 'Test Description',
      color: '#FF5733',
    };

    const res = await request(app.getHttpServer())
      .get(`/categories/${categoryId}`)
      .expect(200);

    expect(res.body).toEqual(expectedCategory);
    expect(mockGetCategoryByIdUseCase.execute).toHaveBeenCalledWith(categoryId);
  });

  it('/categories (GET) should get all categories', async () => {
    const expectedCategories = [
      {
        id: 1,
        name: 'Test Category 1',
        description: 'Test Description 1',
        color: '#FF5733',
      },
      {
        id: 2,
        name: 'Test Category 2',
        description: 'Test Description 2',
        color: '#33FF57',
      },
    ];

    const res = await request(app.getHttpServer())
      .get('/categories')
      .expect(200);

    expect(res.body).toEqual(expectedCategories);
    expect(mockGetAllCategoriesUseCase.execute).toHaveBeenCalled();
  });
});
