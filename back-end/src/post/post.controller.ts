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
  Req,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { CreatePostDto } from '../infrastructure/db/dto/postDto/create-post.dto';
import { UpdatePostDto } from '../infrastructure/db/dto/postDto/update-post.dto';
import { PostService } from './post.service';
import { CommentDto } from 'src/infrastructure/db/dto/postDto/comment-post.dto';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userServices: UserService,
  ) {}

  /*  Este método maneja las solicitudes POST para crear una nueva 
  publicación. Requiere un createPostDto en el cuerpo de la solicitud 
  y utiliza el servicio postService para crear la publicación. */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req: Request,
    @Body() createPostDto: CreatePostDto,
    @Res() res: Response,
  ) {
    const newPost = await this.postService.create(req.user, createPostDto);
    return res.status(HttpStatus.CREATED).json(newPost);
  }

  /*  Este método maneja las solicitudes GET para obtener todas las 
  publicaciones. Puede opcionalmente recibir parámetros de consulta 
  page y limit para paginar los resultados.*/
  @Get()
  async findAll(
    @Query('page') page: string = '0',
    @Query('limit') limit: string = '0',
    @Res() res: Response,
  ) {
    const posts = await this.postService.findAll(page, limit);
    return res.status(HttpStatus.OK).json(posts);
  }

  /* Este método maneja las solicitudes GET para obtener una publicación 
  específica por su ID.*/
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postService.findOne(id);
  }

  /*  Este método maneja las solicitudes GET para obtener publicaciones 
  asociadas a un profesional específico por su ID. */
  @Get('professional/:id')
  async findByProfessional(@Param('id') id: string, @Res() res: Response) {
    const newPost = await this.postService.findByProfessional(id);
    return res.status(HttpStatus.OK).json(newPost);
  }

  /*  Este método maneja las solicitudes GET para obtener publicaciones por 
  una categoría específica. También puede recibir parámetros de consulta page 
  y limit. */
  @Get('category/:category')
  async findByCategory(
    @Param('category') category: string,
    @Query('page') page: string = '0',
    @Query('limit') limit: string = '0',
    @Res() res: Response,
  ) {
    console.log('get category', category, page, limit);
    const newPost = await this.postService.findByCategory(
      category,
      page,
      limit,
    );
    return res.status(HttpStatus.OK).json(newPost);
  }

  /*  Este método maneja las solicitudes POST para agregar un comentario 
  a una publicación específica. Requiere un objeto comment en el cuerpo 
  de la solicitud. */
  @UseGuards(JwtAuthGuard)
  @Post('comment/:idPost')
  async comments(
    @Req() req: Request,
    @Param('idPost') idPost: string,
    @Body() comment: CommentDto,
    @Res() res: Response,
  ) {
    const data = await this.postService.newComments(req.user, idPost, comment);
    return res.status(HttpStatus.OK).json(data);
  }

  /*  Este método maneja las solicitudes PUT para actualizar una publicación 
  existente. Requiere un updatePostDto en el cuerpo de la solicitud y verifica 
  los permisos de seguridad antes de realizar la actualización. */
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const permission = await this.postService.security(req.user, id);
    if (permission === false) throw new UnauthorizedException();
    const data = await this.postService.update(id, updatePostDto);
    return res.status(HttpStatus.OK).json(data);
  }

  /*  Este método maneja las solicitudes DELETE para eliminar una publicación por 
  su ID. */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }

  /* Este método maneja las solicitudes POST para cargar una imagen asociada a una 
  publicación. Utiliza FileInterceptor para manejar la carga de archivos y verifica 
  los permisos antes de cargar la imagen. */
  @UseGuards(JwtAuthGuard)
  @Post('image/:idPost')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImagePost(
    @UploadedFile() file: Express.Multer.File,
    @Param('idPost') idPost: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const permission = await this.postService.security(req.user, idPost);
      if (permission === false) throw new UnauthorizedException();
      const data = await this.userServices.uploadImage(file);
      await this.postService.saveImagePost(data.secure_url, idPost);
      return res.status(HttpStatus.OK).json('the image was loaded correctly');
    } catch (error) {
      throw error;
    }
  }
}
