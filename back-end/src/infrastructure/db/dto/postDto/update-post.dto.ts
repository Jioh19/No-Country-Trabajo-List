import { IsArray, IsEnum, IsNumber, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Comments } from 'src/common/classes/comments.class';
import { Services } from 'src/common/classes/services.class';
import { CategoriesEnum } from 'src/common/enums/categories.enum';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  description?: string;

  @IsString()
  @IsOptional()
  @IsEnum(CategoriesEnum)
  category?: CategoriesEnum;

  @IsOptional()
  services?: Services[];

  @IsString()
  @IsOptional()
  nameProfessional?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  comments?: Comments[];

  @IsNumber()
  @IsOptional()
  views?: number;
}
