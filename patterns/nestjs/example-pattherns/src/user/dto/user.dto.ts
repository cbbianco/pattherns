import { RolesEnum } from './roles/roles.enum';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserDto {
  @IsEmail({}, { message: 'El formato del email es inválido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsEnum(RolesEnum, { message: 'El rol proporcionado no es válido' })
  @IsNotEmpty()
  levelRol: RolesEnum;

  @IsString()
  @IsOptional()
  username?: string;
}
