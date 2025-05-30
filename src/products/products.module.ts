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
import { UpdateProductPriceUseCase } from './application/update-product-price.use-case';
import { DeleteProductPriceUseCase } from './application/delete-product-price.use-case';

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
    UpdateProductPriceUseCase,
    DeleteProductPriceUseCase,
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
    UpdateProductPriceUseCase,
    DeleteProductPriceUseCase,
  ],
})
export class ProductsModule {}
