import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  // Este método valida las credenciales de usuario (correo electrónico y contraseña).
  // Toma dos parámetros: 'email' y 'password'.
  // 'email' representa el correo electrónico del usuario y 'password' su contraseña.
  // Primero, se busca el usuario en la base de datos utilizando el método findEmail() del servicio UserService.
  // Si no se encuentra ningún usuario con el correo electrónico proporcionado, se lanza una excepción de UnauthorizedException.
  // Después, se compara la contraseña proporcionada con la contraseña almacenada en la base de datos utilizando el método comparePassword().
  // Si la contraseña no coincide, también se lanza una excepción de UnauthorizedException.
  // Si las credenciales son válidas, se construye un objeto payload que contiene información relevante del usuario, como su ID, correo electrónico y si es un usuario profesional.
  // Luego, se firma el payload utilizando el servicio JwtService y se devuelve el token JWT firmado.
  async validateUser(email: string, password: string): Promise<any> {
    const userAccount = await this.userService.findEmail(email);
    if (userAccount == null) {
      throw new UnauthorizedException();
    }
    const userPassword = userAccount?.password as string;
    const valid = await this.comparePassword(password, userPassword);
    if (!valid) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: userAccount._id,
      email: userAccount.email,
      isProfessional: userAccount.isProfessional,
      message: 'Este es el payload',
    };
    return this.jwtService.signAsync(payload);
  }
  // Este método compara una contraseña proporcionada con una contraseña almacenada utilizando algún mecanismo seguro de comparación de contraseñas.
  // Toma dos parámetros: 'password' y 'hashedPassword'.
  // 'password' representa la contraseña proporcionada por el usuario.
  // 'hashedPassword' representa la contraseña almacenada, que se ha obtenido de la base de datos.
  // Este método podría ser una llamada a una biblioteca externa o una función personalizada que implementa la lógica de comparación segura de contraseñas.
  // Por ejemplo, encriptando la contraseña proporcionada y comparándola con la contraseña almacenada en su versión encriptada.
  async comparePassword(password: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }
}
