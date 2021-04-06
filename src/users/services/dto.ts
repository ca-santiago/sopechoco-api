import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserAccountDTO {
  @IsEmail()
  email: string;

  @IsString()
  @Length(4, 32)
  password: string;

  @IsString()
  @Length(4, 64)
  name: string;
}
