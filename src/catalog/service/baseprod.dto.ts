import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProductDefinitionDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  description?: string;

  @IsArray()
  @IsString({ each: true })
  guisos: string[];

  @IsBoolean()
  available: boolean;

  @IsNumber()
  @IsNotEmpty()
  maxGuisos: number;

  @IsNumber()
  @IsNotEmpty()
  minGuisos: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
