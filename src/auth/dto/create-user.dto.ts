import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  readonly firstName: string;
  readonly lastName: string;
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
}
