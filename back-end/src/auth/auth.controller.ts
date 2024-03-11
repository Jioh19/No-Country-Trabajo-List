import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Este controlador maneja solicitudes POST para iniciar sesión de usuario.
  // Utiliza la anotación @UseGuards(LocalAuthGuard) para aplicar un guardia de autenticación local, que maneja la autenticación del usuario utilizando credenciales locales (por ejemplo, correo electrónico y contraseña).
  // La ruta POST 'login' es la ruta a la que se envían las solicitudes para iniciar sesión de usuario.
  // El método login() toma dos parámetros: 'req' y 'res'.
  // 'req' representa el objeto de solicitud HTTP, que se inyecta utilizando la anotación @Req.
  // 'res' representa el objeto de respuesta HTTP, que se inyecta utilizando la anotación @Res.
  // Dentro del método, se devuelve una respuesta JSON con el estado 200 (OK) y los datos del usuario autenticado, que se obtienen del objeto de solicitud 'req.user'.
  // 'req.user' es proporcionado por el guardia de autenticación local (LocalAuthGuard) después de que el usuario se autentique con éxito.
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json(req.user);
  }
}
