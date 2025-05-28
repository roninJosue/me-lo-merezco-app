import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CreateCategoryUseCase } from '../application/create-category.use-case';
import { UpdateCategoryUseCase } from '../application/update-category.use-case';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryRequestDto } from '../dto/update-category-request.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
  ) {}

  @Post()
  async createCategory(@Body() body: CreateCategoryDto) {
    const result = await this.createCategoryUseCase.execute(body);

    return {
      id: result.id,
      success: true,
    };
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() body: UpdateCategoryRequestDto,
  ) {
    await this.updateCategoryUseCase.execute({
      id,
      ...body,
    });

    return {
      success: true,
    };
  }
}
