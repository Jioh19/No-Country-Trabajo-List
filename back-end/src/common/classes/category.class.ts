import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { CategoriesEnum } from '../enums/categories.enum';

export class Category {
  name: CategoriesEnum;
  scores?: number;
}
