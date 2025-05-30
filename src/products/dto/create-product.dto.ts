import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  categoryId: number;

  @IsBoolean()
  hasExpiration: boolean;

  @IsString()
  @IsOptional()
  image?: string;

  /*  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddProductPriceDto)
  @IsOptional()
  prices?: AddProductPriceDto[];*/
}
