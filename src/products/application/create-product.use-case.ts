import { ConflictException, Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  ProductRepositoryPort,
} from '../domain/product-repository.port';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product, ProductPrice } from '../domain/product.entity';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepositoryPort,
  ) {}

  async execute(productDto: CreateProductDto): Promise<{ id: number }> {
    try {
      const product = new Product(
        0,
        productDto.code,
        productDto.name,
        productDto.description ?? '',
        productDto.categoryId,
        productDto.hasExpiration,
        productDto.image ?? '',
        (productDto.prices ?? []).map(
          (p) => new ProductPrice(p.priceType, p.price, p.minimumQuantity),
        ),
      );

      const savedProduct = await this.productRepository.save(product);
      return { id: savedProduct.id };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Product already exists');
      }
      throw error;
    }
  }
}
