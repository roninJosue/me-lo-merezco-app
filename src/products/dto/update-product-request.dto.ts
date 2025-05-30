import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';

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

  /*  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductPriceRequestDto)
  @IsOptional()
  prices?: UpdateProductPriceRequestDto[];*/
}
