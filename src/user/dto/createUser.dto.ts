import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  // @IsNumber()
  // @IsNotEmpty()
  // id: number
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
