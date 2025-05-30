import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateProductUseCase } from '../application/create-product.use-case';
import { CreateProductDto } from '../dto/create-product.dto';
import { AddProductPriceDto } from '../dto/add-product-price.dto';
import { AddProductPriceUseCase } from '../application/add-product-price.use-case';
import { UpdateProductUseCase } from '../application/update-product.use-case';
import { UpdateProductRequestDto } from '../dto/update-product-request.dto';
import { UpdateProductPriceUseCase } from '../application/update-product-price.use-case';
import { UpdateProductPriceRequestDto } from '../dto/update-product-price-request.dto';
import { DeleteProductPriceUseCase } from '../application/delete-product-price.use-case';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly addProductPriceUseCase: AddProductPriceUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly updateProductPriceUseCase: UpdateProductPriceUseCase,
    private readonly deleteProductPriceUseCase: DeleteProductPriceUseCase,
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

  @Put(':id/prices/:priceId')
  async updateProductPrice(
    @Param('id', ParseIntPipe) productId: number,
    @Param('priceId', ParseIntPipe) priceId: number,
    @Body() dto: UpdateProductPriceRequestDto,
  ) {
    await this.updateProductPriceUseCase.execute(dto, productId, priceId);

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

  @Delete(':id/prices/:priceId')
  async deleteProductPrice(
    @Param('id', ParseIntPipe) productId: number,
    @Param('priceId', ParseIntPipe) priceId: number,
  ) {
    await this.deleteProductPriceUseCase.execute(productId, priceId);
    return {
      success: true,
    };
  }
}
