import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryOrm } from './infrastructure/category-orm.entity';
import { CATEGORY_REPOSITORY } from './domain/category-repository.port';
import { CategoryRepositoryAdapter } from './infrastructure/category.repository.adapter';
import { CategoriesController } from './infrastructure/categories.controller';
import { CreateCategoryUseCase } from './application/create-category.use-case';
import { UpdateCategoryUseCase } from './application/update-category.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryOrm])],
  controllers: [CategoriesController],
  providers: [
    CreateCategoryUseCase,
    UpdateCategoryUseCase,
    {
      provide: CATEGORY_REPOSITORY,
      useClass: CategoryRepositoryAdapter,
    },
    CategoryRepositoryAdapter,
  ],
  exports: [CATEGORY_REPOSITORY, CreateCategoryUseCase, UpdateCategoryUseCase],
})
export class CategoriesModule {}
