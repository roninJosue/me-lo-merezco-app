import { Category } from '../../categories/domain/category.entity';
import { ConflictException } from '@nestjs/common';

export class ProductPrice {
  constructor(
    public readonly id: number,
    public priceType: string,
    public price: number,
    public minimumQuantity: number,
  ) {}

  updatePrice(price: number) {
    this.price = price;
  }

  updateMinimumQuantity(minimumQuantity: number) {
    this.minimumQuantity = minimumQuantity;
  }

  updatePriceType(priceType: string) {
    this.priceType = priceType;
  }

  update(
    updates: Partial<{
      priceType: string;
      price: number;
      minimumQuantity: number;
    }>,
  ) {
    if (updates.priceType) {
      this.updatePriceType(updates.priceType);
    }
    if (updates.price) {
      this.updatePrice(updates.price);
    }
    if (updates.minimumQuantity) {
      this.updateMinimumQuantity(updates.minimumQuantity);
    }
  }
}

export class Product {
  constructor(
    public readonly id: number,
    public code: string,
    public name: string,
    public description: string,
    public category: Category,
    public hasExpiration: boolean,
    public image: string,
    public prices: ProductPrice[] = [],
  ) {}

  addPrice(price: ProductPrice) {
    if (!this.findPriceById(price.id)) {
      this.prices.push(price);
    }
  }

  findPriceById(priceId: number) {
    return this.prices.find((p) => p.id === priceId);
  }

  findPriceByPriceType(priceType: string) {
    return this.prices.find((p) => p.priceType === priceType);
  }

  updatePriceById(
    priceId: number,
    price: Partial<{
      priceType: string;
      price: number;
      minimumQuantity: number;
    }>,
  ) {
    const existing = this.findPriceById(priceId);

    if (existing) {
      if (price.priceType && price.priceType !== existing.priceType) {
        const existingPriceType = this.findPriceByPriceType(price.priceType);
        if (existingPriceType && existingPriceType.id !== priceId) {
          throw new ConflictException('Price type already exists');
        }
      }
      existing.update(price);
    }
  }

  removePriceById(priceId: number) {
    const index = this.prices.findIndex((p) => p.id === priceId);
    if (index !== -1) {
      this.prices.splice(index, 1);
    }
  }
}
