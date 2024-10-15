import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface'; // Créez cette interface pour définir le payload JWT
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extraction du JWT de l'en-tête Authorization
      ignoreExpiration: false, // Ne pas ignorer l'expiration du JWT
      secretOrKey: process.env.JWT_SECRET, // Ajoutez la clé secrète ici
    });
  }

  async validate(payload: JwtPayload) {
    // Cette méthode est appelée si le JWT est valide
    // je peux  ajouter votre logique ici pour vérifier l'utilisateur dans la base de données
    return { userId: payload.userId }; //Je peux retourner un utilisateur complet si nécessaire
  }
}
