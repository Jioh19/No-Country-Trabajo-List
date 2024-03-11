import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Category } from 'src/common/classes/category.class';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @Transform(({ value }) => value.trim())
  @IsOptional()
  @MinLength(6)
  password?: string;

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
