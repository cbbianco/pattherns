import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class SearchObjectsDto {
  @IsNotEmpty()
  @IsString()
  objectType: string;

  @IsNotEmpty()
  @IsString()
  selectedObject: string;

  @IsOptional()
  @IsString()
  idNumber?: string;
  @IsNotEmpty()
  @IsString()
  customs: string;

  @IsOptional()
  @IsString()
  fromDate?: string;

  @IsOptional()
  @IsString()
  toDate?: string;
}
