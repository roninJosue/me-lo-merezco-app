import { Inject, Injectable } from '@nestjs/common';
import {
  CATEGORY_REPOSITORY,
  CategoryRepositoryPort,
} from '../domain/category-repository.port';
import { Category } from '../domain/category.entity';

@Injectable()
export class GetAllCategoriesUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepositoryPort,
  ) {}

  async execute(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}
