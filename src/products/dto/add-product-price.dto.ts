import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class AddProductPriceDto {
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
