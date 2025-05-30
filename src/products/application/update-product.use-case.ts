import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  ProductRepositoryPort,
} from '../domain/product-repository.port';
import {
  CATEGORY_REPOSITORY,
  CategoryRepositoryPort,
} from '../../categories/domain/category-repository.port';
import { UpdateProductRequestDto } from '../dto/update-product-request.dto';
import { Product } from '../domain/product.entity';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepositoryPort,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepositoryPort,
  ) {}

  async execute(
    id: number,
    productDto: UpdateProductRequestDto,
  ): Promise<void> {
    try {
      const product = await this.findProductById(id);

      await this.updateCategoryIfProvided(product, productDto.categoryId);
      this.updateProductFields(product, productDto);

      await this.productRepository.update(product);
    } catch (error) {
      this.handleUpdateError(error);
    }
  }

  private async findProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  private async updateCategoryIfProvided(
    product: Product,
    categoryId?: number,
  ) {
    if (categoryId && product.category.id !== categoryId) {
      const category = await this.categoryRepository.findById(categoryId);

      if (!category) {
        throw new ConflictException(`Category with id ${categoryId} not found`);
      }

      product.category = category;
    }
  }

  private updateProductFields(
    product: Product,
    productDto: UpdateProductRequestDto,
  ) {
    const fieldsToUpdate = [
      { field: 'code', value: productDto.code },
      { field: 'name', value: productDto.name },
      { field: 'description', value: productDto.description },
      { field: 'hasExpiration', value: productDto.hasExpiration },
      { field: 'image', value: productDto.image },
    ];

    fieldsToUpdate.forEach(({ field, value }) => {
      if (value !== undefined) {
        product[field] = value;
      }
    });
  }

  private handleUpdateError(error: any) {
    if (
      error instanceof NotFoundException ||
      error instanceof ConflictException ||
      error instanceof BadRequestException
    ) {
      throw error;
    }

    if (error.code === '23505') {
      throw new ConflictException('Product with this code already exists');
    }

    throw new ConflictException('Failed to update product');
  }
}
