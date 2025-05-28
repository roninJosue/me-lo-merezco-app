import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CATEGORY_REPOSITORY,
  CategoryRepositoryPort,
} from '../domain/category-repository.port';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../domain/category.entity';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepositoryPort,
  ) {}

  async execute(request: UpdateCategoryDto): Promise<void> {
    const existingCategory = await this.categoryRepository.findById(request.id);

    if (!existingCategory) {
      throw new NotFoundException(`Category with id ${request.id} not found`);
    }

    const updatedCategory = new Category(
      existingCategory.id,
      request.name ?? existingCategory.name,
      request.description ?? existingCategory.description,
      request.color ?? existingCategory.color,
    );

    await this.categoryRepository.update(updatedCategory);
  }
}
