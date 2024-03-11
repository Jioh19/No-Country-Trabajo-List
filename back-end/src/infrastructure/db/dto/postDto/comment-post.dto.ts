import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CommentDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  nameClient: string;

  @IsOptional()
  @IsString()
  textClient: string;

  @IsOptional()
  @IsString()
  answer: string;
}
