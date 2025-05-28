import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ProductOrm,
  ProductPriceOrm,
} from './infrastructure/product-orm.entity';
import { ProductsController } from './infrastructure/products.controller';
import { CreateProductUseCase } from './application/create-product.use-case';
import { PRODUCT_REPOSITORY } from './domain/product-repository.port';
import { ProductRepositoryAdapter } from './infrastructure/product-repository.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrm, ProductPriceOrm])],
  controllers: [ProductsController],
  providers: [
    CreateProductUseCase,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepositoryAdapter,
    },
    ProductRepositoryAdapter,
  ],
  exports: [CreateProductUseCase],
})
export class ProductsModule {}
