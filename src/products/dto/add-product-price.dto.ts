import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class AddProductPriceDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  priceType: string;

  @IsNumber()
  @Min(1)
  minimumQuantity: number;

  @IsNumber()
  @IsPositive()
  price: number;
}
