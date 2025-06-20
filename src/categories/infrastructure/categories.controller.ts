import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryUseCase } from '../application/create-category.use-case';
import { UpdateCategoryUseCase } from '../application/update-category.use-case';
import { DeleteCategoryUseCase } from '../application/delete-category.use-case';
import { GetCategoryByIdUseCase } from '../application/get-category-by-id.use-case';
import { GetAllCategoriesUseCase } from '../application/get-all-categories.use-case';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryRequestDto } from '../dto/update-category-request.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
    private readonly getCategoryByIdUseCase: GetCategoryByIdUseCase,
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
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
    @Param('id', ParseIntPipe) id: number,
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

  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    await this.deleteCategoryUseCase.execute(id);

    return {
      success: true,
    };
  }

  @Get(':id')
  async getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.getCategoryByIdUseCase.execute(id);
  }

  @Get()
  async getAllCategories() {
    return this.getAllCategoriesUseCase.execute();
  }
}
