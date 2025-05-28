import { IsHexColor, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryRequestDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsHexColor()
  color?: string;
}
