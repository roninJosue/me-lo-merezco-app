import { Inject, Injectable } from '@nestjs/common';
import {
  CATEGORY_REPOSITORY,
  CategoryRepositoryPort,
} from '../domain/category-repository.port';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../domain/category.entity';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepositoryPort,
  ) {}

  async execute(request: CreateCategoryDto): Promise<{ id: number }> {
    const category = new Category(
      0,
      request.name,
      request.description,
      request.color,
    );
    const newCategory = await this.categoryRepository.save(category);

    return {
      id: newCategory.id,
    };
  }
}
