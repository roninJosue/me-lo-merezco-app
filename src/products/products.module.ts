import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ProductOrm,
  ProductPriceOrm,
} from './infrastructure/product-orm.entity';
import { ProductsController } from './infrastructure/products.controller';
import { CreateProductUseCase } from './application/create-product.use-case';
import { PRODUCT_REPOSITORY } from './domain/product-repository.port';
import { ProductRepositoryAdapter } from './infrastructure/product-repository.adapter';
import { CategoriesModule } from '../categories/categories.module';
import { AddProductPriceUseCase } from './application/add-product-price.use-case';
import { UpdateProductUseCase } from './application/update-product.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductOrm, ProductPriceOrm]),
    forwardRef(() => CategoriesModule),
  ],
  controllers: [ProductsController],
  providers: [
    CreateProductUseCase,
    AddProductPriceUseCase,
    UpdateProductUseCase,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepositoryAdapter,
    },
    ProductRepositoryAdapter,
  ],
  exports: [
    PRODUCT_REPOSITORY,
    CreateProductUseCase,
    AddProductPriceUseCase,
    UpdateProductUseCase,
  ],
})
export class ProductsModule {}
