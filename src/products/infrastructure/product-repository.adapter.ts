import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductRepositoryPort } from '../domain/product-repository.port';
import { ProductOrm } from './product-orm.entity';
import { Product, ProductPrice } from '../domain/product.entity';

@Injectable()
export class ProductRepositoryAdapter implements ProductRepositoryPort {
  constructor(
    @InjectRepository(ProductOrm)
    private readonly productRepository: Repository<ProductOrm>,
  ) {}

  async findById(id: number): Promise<Product | null> {
    const product = await this.productRepository.findOneBy({ id });
    return product
      ? new Product(
          product.id,
          product.code,
          product.name,
          product.description,
          product.category,
          product.hasExpiration,
          product.image,
          product.prices.map(
            (p) =>
              new ProductPrice(p.id, p.priceType, p.price, p.minimumQuantity),
          ),
        )
      : null;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();
    return products.map(
      (p) =>
        new Product(
          p.id,
          p.code,
          p.name,
          p.description,
          p.category,
          p.hasExpiration,
          p.image,
          p.prices.map(
            (p) =>
              new ProductPrice(p.id, p.priceType, p.price, p.minimumQuantity),
          ),
        ),
    );
  }

  async findByCategoryId(categoryId: number): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: {
        category: { id: categoryId },
      },
    });
    return products.map(
      (p) =>
        new Product(
          p.id,
          p.code,
          p.name,
          p.description,
          p.category,
          p.hasExpiration,
          p.image,
          p.prices.map(
            (p) =>
              new ProductPrice(p.id, p.priceType, p.price, p.minimumQuantity),
          ),
        ),
    );
  }

  async save(product: Product): Promise<Product> {
    const productOrm = this.productRepository.create(product);
    const saved = await this.productRepository.save(productOrm);
    return new Product(
      saved.id,
      saved.code,
      saved.name,
      saved.description,
      saved.category,
      saved.hasExpiration,
      saved.image,
      saved.prices.map(
        (p) => new ProductPrice(p.id, p.priceType, p.price, p.minimumQuantity),
      ),
    );
  }

  async update(product: Product): Promise<void> {
    await this.productRepository.save(product);
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
