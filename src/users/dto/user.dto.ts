import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUser {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsEmail({}, { message: 'Invalid email message' })
  email: string;

  @MinLength(6)
  @IsString()
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;

  @IsString()
  site: string;

  @IsString()
  image: string;

  @IsIn(['ADMIN_ROL', 'USER_ROL', 'CLIENT_ROL', 'VENTAS_ROL', 'HELPER_ROL'])
  @IsNotEmpty()
  @IsString()
  role: string;
}

export class UpdateUser extends OmitType(CreateUser, [
  'password',
  'email',
  'site',
  'role',
]) {}
