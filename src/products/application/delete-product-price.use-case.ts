import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  ProductRepositoryPort,
} from '../domain/product-repository.port';

@Injectable()
export class DeleteProductPriceUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepositoryPort,
  ) {}

  async execute(producId: number, priceId: number): Promise<void> {
    const product = await this.productRepository.findById(producId);

    if (!product) {
      throw new NotFoundException(`Product with id ${producId} not found`);
    }

    product.removePriceById(priceId);

    await this.productRepository.update(product);
  }
}
