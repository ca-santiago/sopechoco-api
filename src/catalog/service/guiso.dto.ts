import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGuisoDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  available: boolean;
}
