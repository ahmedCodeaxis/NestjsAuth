import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsIn } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()  // Le champ devient optionnel
  @IsString()
  @IsIn(['admin', 'client'], { message: 'Role must be either admin or client' })  
  role?: string;  // Le rôle est facultatif
}
