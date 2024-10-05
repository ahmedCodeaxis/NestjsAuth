import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // Assurez-vous d'importer et injecter JwtService
import { v4 as uuidv4 } from 'uuid'; // Pour générer des jetons d'actualisation uniques
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto'; // Importez votre DTO Login
import { User } from '../user/user.schema'; // Assurez-vous d'avoir le schéma User

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>, // Injection du modèle User
    @InjectModel('RefreshToken') private readonly refreshTokenModel: Model<any>, // Modèle pour les tokens d'actualisation
    private readonly jwtService: JwtService, // Injection du JwtService
  ) {}

  async signup(signupData: SignupDto) {
    const { email, password, name,role } = signupData;

    // Vérifier si l'email est déjà utilisé
    const emailInUse = await this.userModel.findOne({ email });
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    await this.userModel.create({
      name,
      email,
      password: hashedPassword,//Password
      role: role || 'client',
    });
  }

  async login(credentials: LoginDto) {
    const { email, password } = credentials;

    // Vérifier si l'utilisateur existe par e-mail
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    // Comparer les mots de passe
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    // Générer les tokens d'authentification
    const tokens = await this.generateUserTokens(user._id.toString());
    return {
      ...tokens,
      userId: user._id,
    };
  }

  async generateUserTokens(userId: string) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '10h' });
    const refreshToken = uuidv4(); // Génération d'un UUID pour le token d'actualisation

    await this.storeRefreshToken(refreshToken, userId);

    return {
      accessToken,
      refreshToken,
    };
  }

  async storeRefreshToken(token: string, userId: string) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3); // Le token d'actualisation expire dans 3 jours

    await this.refreshTokenModel.updateOne(
      { userId },
      { $set: { expiryDate, token } },
      { upsert: true }, // Créer le document s'il n'existe pas
    );
  }

  async refreshTokens(refreshToken: string) {
    // Vérifier si le token d'actualisation est valide et non expiré
    const token = await this.refreshTokenModel.findOne({
      token: refreshToken,
      expiryDate: { $gte: new Date() },
    });

    if (!token) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // Générer un nouvel ensemble de tokens
    return this.generateUserTokens(token.userId);
  }
}
