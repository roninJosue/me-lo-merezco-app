import { Product } from './product.entity';

export const PRODUCT_REPOSITORY = 'ProductRepositoryPort';

export abstract class ProductRepositoryPort {
  abstract findById(id: number): Promise<Product | null>;
  abstract findAll(): Promise<Product[]>;
  abstract findByCategoryId(categoryId: number): Promise<Product[]>;
  abstract save(product: Product): Promise<Product>;
  abstract update(product: Product): Promise<void>;
  abstract delete(id: number): Promise<void>;
}
