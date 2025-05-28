export class ProductPrice {
  constructor(
    public readonly priceType: string,
    public readonly price: number,
    public readonly minimumQuantity: number,
  ) {}
}

export class Product {
  constructor(
    public readonly id: number,
    public code: string,
    public name: string,
    public description: string,
    public categoryId: number,
    public hasExpiration: boolean,
    public image: string,
    public prices: ProductPrice[],
  ) {}

  addPrice(price: ProductPrice) {
    this.prices.push(price);
  }
}
