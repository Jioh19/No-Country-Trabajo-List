import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Category } from 'src/common/classes/category.class';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNumber()
  @IsOptional()
  readonly phone?: number;

  @IsString()
  @IsOptional()
  readonly imageProfile?: string;

  @IsBoolean()
  @IsOptional()
  readonly isProfessional?: boolean;

  @IsOptional()
  readonly category?: Category[];

  @IsString()
  @IsOptional()
  readonly address?: string;
}
