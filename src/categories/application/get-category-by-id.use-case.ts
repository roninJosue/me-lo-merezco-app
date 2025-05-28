import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CATEGORY_REPOSITORY,
  CategoryRepositoryPort,
} from '../domain/category-repository.port';
import { Category } from '../domain/category.entity';

@Injectable()
export class GetCategoryByIdUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepositoryPort,
  ) {}

  async execute(id: number): Promise<Category> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }
}
