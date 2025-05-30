import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class UpdateProductPriceRequestDto {
  @IsString()
  @IsOptional()
  priceType: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  minimumQuantity: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price: number;
}
