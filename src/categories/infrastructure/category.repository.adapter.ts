import { Injectable } from '@nestjs/common';
import { CategoryRepositoryPort } from '../domain/category-repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryOrm } from './category-orm.entity';
import { Repository } from 'typeorm';
import { Category } from '../domain/category.entity';

@Injectable()
export class CategoryRepositoryAdapter implements CategoryRepositoryPort {
  constructor(
    @InjectRepository(CategoryOrm)
    private readonly categoryRepository: Repository<CategoryOrm>,
  ) {}

  async findById(id: number): Promise<Category | null> {
    const category = await this.categoryRepository.findOneBy({ id });

    return category
      ? new Category(
          category.id,
          category.name,
          category.description,
          category.color,
        )
      : null;
  }

  findAll(): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }
  async save(category: Category): Promise<Category> {
    const categoryOrm = this.categoryRepository.create(category);
    const saved = await this.categoryRepository.save(categoryOrm);

    return new Category(saved.id, saved.name, saved.description, saved.color);
  }
  async update(category: Category): Promise<void> {
    await this.categoryRepository.update(
      { id: category.id },
      {
        name: category.name,
        description: category.description,
        color: category.color,
      },
    );
  }
  async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
