import {
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {UpdateProductPriceRequestDto} from "./update-product-price-request.dto";

export class UpdateProductRequestDto {
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
  @Type(() => UpdateProductPriceRequestDto)
  @IsOptional()
  prices?: UpdateProductPriceRequestDto[];
}
