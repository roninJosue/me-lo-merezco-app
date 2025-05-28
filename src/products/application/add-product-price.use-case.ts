import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  ProductRepositoryPort,
} from '../domain/product-repository.port';
import { AddProductPriceRequestDto } from '../dto/add-product-price-request.dto';
import { ProductPrice } from '../domain/product.entity';

@Injectable()
export class AddProductPriceUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepositoryPort,
  ) {}

  async execute(request: AddProductPriceRequestDto): Promise<void> {
    const product = await this.productRepository.findById(request.productId);

    if (!product) {
      throw new NotFoundException(
        `Product with id ${request.productId} not found`,
      );
    }

    const newPrice = new ProductPrice(
      0,
      request.price.priceType,
      request.price.price,
      request.price.minimumQuantity,
    );

    product.addPrice(newPrice);

    await this.productRepository.update(product);
  }
}
