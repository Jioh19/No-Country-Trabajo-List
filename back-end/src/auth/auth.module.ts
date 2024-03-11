import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  // Importa otros módulos requeridos por este módulo
  imports: [
    ConfigModule.forRoot(), // Importa el módulo Config para acceder a variables de entorno
    PassportModule, // Importa PassportModule para la autenticación
    UserModule, // Importa el módulo de usuarios
    JwtModule.register({
      // Importa el módulo JWT para la autenticación basada en tokens
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
