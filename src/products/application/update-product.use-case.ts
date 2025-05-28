import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  ProductRepositoryPort,
} from '../domain/product-repository.port';
import { ProductPrice } from '../domain/product.entity';
import {
  CATEGORY_REPOSITORY,
  CategoryRepositoryPort,
} from '../../categories/domain/category-repository.port';
import {UpdateProductRequestDto} from "../dto/update-product-request.dto";

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepositoryPort,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepositoryPort,
  ) {}

  async execute(id: number, productDto: UpdateProductRequestDto): Promise<void> {
    try {
      // Find the existing product
      const product = await this.productRepository.findById(id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }

      // Update category if provided
      if (productDto.categoryId) {
        const category = await this.categoryRepository.findById(
          productDto.categoryId,
        );
        if (!category) {
          throw new ConflictException('Category not found');
        }
        product.category = category;
      }

      // Update other fields if provided
      if (productDto.code !== undefined) {
        product.code = productDto.code;
      }
      if (productDto.name !== undefined) {
        product.name = productDto.name;
      }
      if (productDto.description !== undefined) {
        product.description = productDto.description;
      }
      if (productDto.hasExpiration !== undefined) {
        product.hasExpiration = productDto.hasExpiration;
      }
      if (productDto.image !== undefined) {
        product.image = productDto.image;
      }

      // Update prices if provided
      if (productDto.prices && productDto.prices.length > 0) {
        productDto.prices.forEach((p) => {
          if (p.id) {
            product.updatePriceById(p.id, p);
          } else {
            product.addPrice(new ProductPrice(0, p.priceType, p.price, p.minimumQuantity));
          }
        });
      }

      await this.productRepository.update(product);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Product with this code already exists');
      }
      throw error;
    }
  }
}
