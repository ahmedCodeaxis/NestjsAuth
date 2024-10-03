import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';
import { JwtStrategy } from './jwt.strategy';
import { RefreshTokenModule } from './refresh-token.module'; // Importez le module ici

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-default-secret-key', // Vous pouvez aussi mettre une clé par défaut
      signOptions: { expiresIn: '10h' },
    }),
    RefreshTokenModule, // Ajoutez le module ici
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})

export class AuthModule {}
