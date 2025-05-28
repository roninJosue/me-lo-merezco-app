import { Category } from './category.entity';

export const CATEGORY_REPOSITORY = 'CategoryRepositoryPort';

export abstract class CategoryRepositoryPort {
  abstract findById(id: number): Promise<Category | null>;
  abstract findAll(): Promise<Category[]>;
  abstract save(category: Category): Promise<Category>;
  abstract update(category: Category): Promise<void>;
  abstract delete(id: number): Promise<void>;
}
