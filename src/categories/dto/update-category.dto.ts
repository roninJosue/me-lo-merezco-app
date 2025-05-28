import { IsNotEmpty, IsNumber } from 'class-validator';
import { UpdateCategoryRequestDto } from './update-category-request.dto';

export class UpdateCategoryDto extends UpdateCategoryRequestDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
