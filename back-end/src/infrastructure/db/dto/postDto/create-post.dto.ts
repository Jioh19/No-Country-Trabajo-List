import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Services } from 'src/common/classes/services.class';
import { CategoriesEnum } from 'src/common/enums/categories.enum';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  description: string;

  @IsEnum(CategoriesEnum)
  @IsNotEmpty()
  category: CategoriesEnum;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  services: Services[];
}
