import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateProductDefinitionDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @IsUUID(4, { each: true })
  guisos: string[];

  @IsBoolean()
  available: boolean;

  @IsNumber()
  @IsNotEmpty()
  maxGuisos: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  minGuisos: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
