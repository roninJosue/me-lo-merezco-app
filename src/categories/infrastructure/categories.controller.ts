import { Body, Controller, Post } from '@nestjs/common';
import { CreateCategoryUseCase } from '../application/create-category.use-case';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

  @Post()
  async createCategory(@Body() body: CreateCategoryDto) {
    const result = await this.createCategoryUseCase.execute(body);

    return {
      id: result.id,
      success: true,
    };
  }
}
