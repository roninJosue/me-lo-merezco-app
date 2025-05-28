import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryOrm } from './infrastructure/category-orm.entity';
import { CATEGORY_REPOSITORY } from './domain/category-repository.port';
import { CategoryRepositoryAdapter } from './infrastructure/category.repository.adapter';
import { CategoriesController } from './infrastructure/categories.controller';
import { CreateCategoryUseCase } from './application/create-category.use-case';
import { UpdateCategoryUseCase } from './application/update-category.use-case';
import { DeleteCategoryUseCase } from './application/delete-category.use-case';
import { GetCategoryByIdUseCase } from './application/get-category-by-id.use-case';
import { GetAllCategoriesUseCase } from './application/get-all-categories.use-case';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryOrm]),
    forwardRef(() => ProductsModule),
  ],
  controllers: [CategoriesController],
  providers: [
    CreateCategoryUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    GetCategoryByIdUseCase,
    GetAllCategoriesUseCase,
    {
      provide: CATEGORY_REPOSITORY,
      useClass: CategoryRepositoryAdapter,
    },
    CategoryRepositoryAdapter,
  ],
  exports: [
    CATEGORY_REPOSITORY,
    CreateCategoryUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    GetCategoryByIdUseCase,
    GetAllCategoriesUseCase,
  ],
})
export class CategoriesModule {}
