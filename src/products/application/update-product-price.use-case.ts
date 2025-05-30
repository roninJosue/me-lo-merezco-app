import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  ProductRepositoryPort,
} from '../domain/product-repository.port';
import { UpdateProductPriceRequestDto } from '../dto/update-product-price-request.dto';

@Injectable()
export class UpdateProductPriceUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepositoryPort,
  ) {}

  async execute(
    request: UpdateProductPriceRequestDto,
    productId: number,
    priceId: number,
  ): Promise<void> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    product.updatePriceById(priceId, request);

    await this.productRepository.update(product);
  }
}
