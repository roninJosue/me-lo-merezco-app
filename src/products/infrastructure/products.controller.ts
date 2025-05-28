import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateProductUseCase } from '../application/create-product.use-case';
import { CreateProductDto } from '../dto/create-product.dto';
import { AddProductPriceDto } from '../dto/add-product-price.dto';
import { AddProductPriceUseCase } from '../application/add-product-price.use-case';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly addProductPriceUseCase: AddProductPriceUseCase,
  ) {}

  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    const result = await this.createProductUseCase.execute(dto);

    return {
      id: result.id,
      success: true,
    };
  }

  @Post(':id/prices')
  async addProductPrice(
    @Param('id', ParseIntPipe) productId: number,
    @Body() dto: AddProductPriceDto,
  ) {
    await this.addProductPriceUseCase.execute({
      productId,
      price: dto,
    });

    return {
      success: true,
    };
  }
}
