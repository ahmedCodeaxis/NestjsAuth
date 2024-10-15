

import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport'; 
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  

  // Route pour l'inscription
  @Post('signup')
  async signup(@Body() signupData: SignupDto) {
    await this.authService.signup(signupData);
    return {
      message: 'User registered successfully',
    };
  }

  // Route pour la connexion
  @Post('login')
  @HttpCode(HttpStatus.OK) // Code de succès
  async login(@Body() credentials: LoginDto) {
    const tokens = await this.authService.login(credentials);
    return tokens; // Retourne les tokens et l'ID utilisateur
  }

  // Route pour rafraîchir le token
  @Post('refresh')
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    const tokens = await this.authService.refreshTokens(refreshTokenDto.refreshToken);
    return tokens; // Retourne les nouveaux tokens
  }

  
}
