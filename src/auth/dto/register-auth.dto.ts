import { IsEmail, IsEnum, IsString, IsDateString, IsNumber } from 'class-validator';
import { Role } from '../common/enums/roles.enum';

export class RegisterDto {
  @IsString() fullname: string;
  @IsEmail() email: string;
  @IsString() password: string;
  @IsString() phone: string;
  @IsString() location: string;
  @IsString() image: string;
  @IsEnum(Role) role: Role;
  @IsNumber() regionId: number;
  @IsDateString() year: string; 
}
