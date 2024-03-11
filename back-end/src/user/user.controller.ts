import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { UpdateUserDto } from 'src/infrastructure/db/dto/userDto/update-user.dto';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/infrastructure/db/dto/userDto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  // Este controlador maneja solicitudes POST para crear un nuevo usuario.
  // La ruta POST '' es la ruta a la que se envían las solicitudes para crear un nuevo usuario.
  // Utiliza la anotación @Post() sin ningún argumento, lo que indica que responde a solicitudes POST sin parámetros adicionales en la URL.
  // El método create() toma dos parámetros: 'createUserDto' y 'res'.
  // 'createUserDto' representa los datos del nuevo usuario, y se obtiene del cuerpo (body) de la solicitud, que se pasa utilizando la anotación @Body.
  // 'res' es el objeto de respuesta HTTP, que se inyecta utilizando la anotación @Res.
  // Dentro del método, se llama al método this.userService.create(createUserDto) para crear un nuevo usuario utilizando los datos proporcionados.
  // El resultado de esta operación se almacena en la variable 'user'.
  // Luego, se envía una respuesta JSON con el estado 201 (CREATED) y un mensaje indicando que el usuario se ha creado correctamente, junto con el nombre del usuario creado.
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.create(createUserDto);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'user created', name: user.name });
  }
  // Este controlador maneja solicitudes GET para recuperar todos los usuarios con paginación opcional.
  // La ruta GET '' es la ruta a la que se envían las solicitudes para obtener todos los usuarios.
  // Utiliza la anotación @Get() sin ningún argumento, lo que indica que responde a solicitudes GET sin parámetros adicionales en la URL.
  // El método findAll() toma tres parámetros opcionales: 'page', 'limit' y 'res'.
  // 'page' y 'limit' se obtienen de la consulta (query) de la URL, utilizando la anotación @Query, y tienen valores predeterminados de '1' y '10' respectivamente.
  // 'res' es el objeto de respuesta HTTP, que se inyecta utilizando la anotación @Res.
  // Dentro del método, se llama al método this.userService.findAll(page, limit) para recuperar los usuarios con paginación opcional.
  // El resultado de esta operación se almacena en la variable 'users'.
  // Luego, se envía una respuesta JSON con el estado 200 (OK) y los datos de los usuarios recuperados.
  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Res() res: Response,
  ) {
    const users = await this.userService.findAll(page, limit);
    return res.status(HttpStatus.OK).json(users);
  }
  // Este controlador maneja la solicitud GET para encontrar un usuario por su ID.
  // Utiliza la anotación @Get(':id') para especificar que esta ruta responde a solicitudes GET con un parámetro 'id' en la URL.
  // El método findId() toma dos parámetros: 'id' y 'res'.
  // 'id' se obtiene del parámetro de ruta especificado en la anotación @Param.
  // 'res' es el objeto de respuesta HTTP, que se inyecta usando la anotación @Res.
  // Dentro del método, se establece el estado de la respuesta en 200 (OK) utilizando HttpStatus.OK y se envía una respuesta JSON.
  // La respuesta se genera utilizando el método this.userService.findId(id), que probablemente busca un usuario en base de datos utilizando el 'id' proporcionado.
  // El resultado de esta búsqueda se envía como respuesta al cliente en formato JSON.
  @Get(':id')
  async findId(@Param('id') id: string, @Res() res: Response) {
    return res.status(HttpStatus.OK).json(await this.userService.findId(id));
  }
  // Este controlador maneja solicitudes POST para encontrar un usuario por su dirección de correo electrónico.
  // Utiliza la anotación @UseGuards(JwtAuthGuard) para aplicar un guardia de autorización JWT, que protege la ruta y requiere que el cliente esté autenticado con un token JWT válido.
  // La ruta POST 'find' es la ruta a la que se envían las solicitudes para encontrar un usuario por correo electrónico.
  // El método findEmail() toma dos parámetros: 'email' y 'res'.
  // 'email' se obtiene del cuerpo (body) de la solicitud POST, que se pasa utilizando la anotación @Body.
  // 'res' es el objeto de respuesta HTTP, que se inyecta utilizando la anotación @Res.
  // Dentro del método, se establece el estado de la respuesta en 200 (OK) utilizando HttpStatus.OK y se envía una respuesta JSON.
  // La respuesta se genera utilizando el método this.userService.findEmail(email), que probablemente busca un usuario en base de datos utilizando el correo electrónico proporcionado.
  // El resultado de esta búsqueda se envía como respuesta al cliente en formato JSON.
  @UseGuards(JwtAuthGuard)
  @Post('find')
  async findEmail(@Body() email: any, @Res() res: Response) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.findEmail(email.email));
  }
  // Este controlador maneja solicitudes PUT para actualizar la información de un usuario.
  // Utiliza la anotación @UseGuards(JwtAuthGuard) para aplicar un guardia de autorización JWT, que protege la ruta y requiere que el cliente esté autenticado con un token JWT válido.
  // La ruta PUT ':id' es la ruta a la que se envían las solicitudes para actualizar la información de un usuario con un ID específico.
  // El método update() toma tres parámetros: 'id', 'updateUser' y 'res'.
  // 'id' se obtiene del parámetro de ruta especificado en la anotación @Param.
  // 'updateUser' se obtiene del cuerpo (body) de la solicitud PUT, que se pasa utilizando la anotación @Body. Probablemente, sea un objeto que contiene los datos a actualizar del usuario.
  // 'res' es el objeto de respuesta HTTP, que se inyecta utilizando la anotación @Res.
  // Dentro del método, se establece el estado de la respuesta en 200 (OK) utilizando HttpStatus.OK y se envía una respuesta JSON.
  // La respuesta se genera utilizando el método this.userService.update(id, updateUser), que probablemente actualiza la información del usuario en base de datos.
  // El resultado de esta actualización se envía como respuesta al cliente en formato JSON.
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.update(id, updateUser));
  }
  // Este controlador maneja solicitudes DELETE para eliminar un usuario por su ID.
  // Utiliza la anotación @UseGuards(JwtAuthGuard) para aplicar un guardia de autorización JWT, que protege la ruta y requiere que el cliente esté autenticado con un token JWT válido.
  // La ruta DELETE ':id' es la ruta a la que se envían las solicitudes para eliminar un usuario con un ID específico.
  // El método delete() toma dos parámetros: 'id' y 'res'.
  // 'id' se obtiene del parámetro de ruta especificado en la anotación @Param.
  // 'res' es el objeto de respuesta HTTP, que se inyecta utilizando la anotación @Res.
  // Dentro del método, se llama al método this.userService.delete(id) para eliminar el usuario de base de datos.
  // El resultado de esta operación de eliminación se almacena en la variable 'data'.
  // Luego, se envía una respuesta JSON con el estado 200 (OK) y los datos devueltos por la operación de eliminación.
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const data = await this.userService.delete(id);
    return res.status(HttpStatus.OK).json(data);
  }
  // Este controlador maneja solicitudes POST para subir una imagen de perfil de usuario.
  // Utiliza la anotación @UseGuards(JwtAuthGuard) para aplicar un guardia de autorización JWT, que protege la ruta y requiere que el cliente esté autenticado con un token JWT válido.
  // La ruta POST 'image/:id' es la ruta a la que se envían las solicitudes para subir una imagen de perfil asociada a un usuario específico mediante su ID.
  // Utiliza la anotación @UseInterceptors(FileInterceptor('image')) para interceptar la solicitud de carga de archivo ('image') y manejarla antes de que llegue al controlador.
  // El método uploadImage() toma tres parámetros: 'file', 'id' y 'res'.
  // 'file' representa el archivo de imagen cargado, y se obtiene utilizando la anotación @UploadedFile.
  // 'id' se obtiene del parámetro de ruta especificado en la anotación @Param y representa el ID del usuario al que se asociará la imagen de perfil.
  // 'res' es el objeto de respuesta HTTP, que se inyecta utilizando la anotación @Res.
  // Dentro del método, se intenta subir la imagen de perfil utilizando el servicio this.userService.uploadImage(file), que maneja la lógica para almacenar la imagen en el servicio Cloudinary.
  // Después de subir la imagen con éxito, se guarda la URL de la imagen en la base de datos del usuario utilizando this.userService.saveImageProfile(data.secure_url, id).
  // Finalmente, se envía una respuesta JSON con el estado 200 (OK) y la URL segura de la imagen recién cargada.
  // Si se produce algún error durante el proceso de carga de la imagen, se maneja en el bloque catch y se lanza una excepción con el mensaje 'Failed to upload image'.
  @UseGuards(JwtAuthGuard)
  @Post('image/:id')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const data = await this.userService.uploadImage(file);
      await this.userService.saveImageProfile(data.secure_url, id);
      return res.status(HttpStatus.OK).json(data.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  }
}
