import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CATEGORY_REPOSITORY,
  CategoryRepositoryPort,
} from '../domain/category-repository.port';
import {
  PRODUCT_REPOSITORY,
  ProductRepositoryPort,
} from '../../products/domain/product-repository.port';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepositoryPort,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepositoryPort,
  ) {}

  async execute(id: number): Promise<void> {
    const existingCategory = await this.categoryRepository.findById(id);

    if (!existingCategory) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    const productsWithCategory = await this.productRepository.findByCategoryId(id);

    if (productsWithCategory.length > 0) {
      throw new ConflictException(
        `Cannot delete category with id ${id} because it has associated products`,
      );
    }

    await this.categoryRepository.delete(id);
  }
}
