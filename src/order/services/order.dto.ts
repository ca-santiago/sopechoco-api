import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty({})
  @Type(() => Item)
  items: Item[];

  @IsArray()
  @IsString({ each: true })
  groups: string[];
}

export class Details {
  @IsString()
  @IsOptional()
  comments: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @ArrayUnique()
  guisos: string[];
}

export class Item {
  @IsString()
  id: string;

  @IsNumber({ maxDecimalPlaces: 0 })
  count: number;

  @IsString()
  @IsOptional()
  groupId: string;

  // Add AccountId to the request

  @IsObject()
  @ValidateNested()
  @Type(() => Details)
  details: Details;
}
