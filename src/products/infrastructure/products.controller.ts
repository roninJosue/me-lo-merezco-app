import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Patch,
} from '@nestjs/common';
import { CreateProductUseCase } from '../application/create-product.use-case';
import { CreateProductDto } from '../dto/create-product.dto';
import { AddProductPriceDto } from '../dto/add-product-price.dto';
import { AddProductPriceUseCase } from '../application/add-product-price.use-case';
import { UpdateProductUseCase } from '../application/update-product.use-case';
import {UpdateProductRequestDto} from "../dto/update-product-request.dto";

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly addProductPriceUseCase: AddProductPriceUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
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

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) productId: number,
    @Body() dto: UpdateProductRequestDto,
  ) {
    await this.updateProductUseCase.execute(productId, dto);

    return {
      success: true,
    };
  }
}
