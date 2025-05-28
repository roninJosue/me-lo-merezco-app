import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductsController } from './products.controller';
import { CreateProductUseCase } from '../application/create-product.use-case';
import { AddProductPriceUseCase } from '../application/add-product-price.use-case';

// Mocks para los casos de uso
const mockCreateProductUseCase = {
  execute: jest.fn((productDto) => Promise.resolve({ id: 1 })),
};

const mockAddProductPriceUseCase = {
  execute: jest.fn((request) => Promise.resolve()),
};

describe('ProductsController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        { provide: CreateProductUseCase, useValue: mockCreateProductUseCase },
        {
          provide: AddProductPriceUseCase,
          useValue: mockAddProductPriceUseCase,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('/products (POST) debe crear un producto', async () => {
    const productData = {
      code: 'PROD001',
      name: 'Test Product',
      description: 'Test Description',
      categoryId: 1,
      hasExpiration: false,
      image: 'test-image.jpg',
      prices: [
        {
          priceType: 'retail',
          minimumQuantity: 1,
          price: 100,
        },
      ],
    };

    const res = await request(app.getHttpServer())
      .post('/products')
      .send(productData)
      .expect(201);

    expect(res.body).toMatchObject({
      id: 1,
      success: true,
    });
    expect(mockCreateProductUseCase.execute).toHaveBeenCalledWith(productData);
  });

  it('/products/:id/prices (POST) debe añadir un precio a un producto', async () => {
    const priceData = {
      priceType: 'wholesale',
      minimumQuantity: 10,
      price: 80,
    };

    const res = await request(app.getHttpServer())
      .post('/products/1/prices')
      .send(priceData)
      .expect(201);

    expect(res.body).toMatchObject({
      success: true,
    });
    expect(mockAddProductPriceUseCase.execute).toHaveBeenCalledWith({
      productId: 1,
      price: priceData,
    });
  });
});
