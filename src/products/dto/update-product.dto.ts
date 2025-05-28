import {
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddProductPriceDto } from './add-product-price.dto';

export class UpdateProductDto {
  @IsInt()
  id: number;

  @IsString()
  code?: string;

  @IsString()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  categoryId?: number;

  @IsBoolean()
  @IsOptional()
  hasExpiration?: boolean;

  @IsString()
  @IsOptional()
  image?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddProductPriceDto)
  @IsOptional()
  prices?: AddProductPriceDto[];
}
