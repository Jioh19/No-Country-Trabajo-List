import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesEnum } from 'src/common/enums/categories.enum';
import { CommentDto } from 'src/infrastructure/db/dto/postDto/comment-post.dto';
import { Post } from 'src/infrastructure/db/schemas/post.schema';
import { UserService } from 'src/user/user.service';
import { CreatePostDto } from '../infrastructure/db/dto/postDto/create-post.dto';
import { UpdatePostDto } from '../infrastructure/db/dto/postDto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    private userService: UserService,
  ) {}

  /* Este método crea una nueva publicación.
  Verifica si el usuario que está creando la publicación es un profesional.
  Si es un profesional, crea una nueva publicación con los datos proporcionados y el nombre del profesional.
  Guarda la nueva publicación en la base de datos y la devuelve. */
  async create(userPayload: any, createPostDto: CreatePostDto): Promise<Post> {
    try {
      if (userPayload.isProfessional != true)
        throw new BadRequestException('is user not professional');

      const { title, description, category, services } = createPostDto;
      const user = await this.userService.findId(userPayload.id);

      if (!user) throw new BadRequestException('user no exist');

      const newPost = new this.postModel({
        title,
        description,
        category,
        services,
        nameProfessional: user.name,
        idProfessional: userPayload.id,
      });
      if (!(newPost.services.length >= 0))
        throw new BadRequestException('the service cannot be empty');

      return newPost.save();
    } catch (error) {
      throw error;
    }
  }

  /* Este método encuentra todas las publicaciones en la base de datos, con paginación opcional.
  Obtiene los parámetros de page y limit y los utiliza para paginar las publicaciones.
  Devuelve las publicaciones encontradas. */
  async findAll(page: string, limit: string): Promise<Post[]> {
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const skip = (pageInt - 1) * limitInt;
    const postsProfessionals = await this.postModel
      .find()
      .skip(skip)
      .limit(limitInt)
      .lean();
    return postsProfessionals;
  }

  /* Encuentra una publicación por su ID.
  Devuelve la publicación si se encuentra.
  Si no se encuentra la publicación, lanza una excepción NotFoundException. */
  async findOne(id: string): Promise<Post> {
    try {
      const post = await this.postModel.findById(id).lean().select('-password');
      if (!post) {
        throw new NotFoundException(`Post #${id} not found`);
      }
      return post;
    } catch (err) {
      console.error(`Error occurred while finding Post #${id}: `, err);
      throw err;
    }
  }

  /* Encuentra las publicaciones asociadas a un profesional específico por su ID.
  Devuelve las publicaciones encontradas o lanza una excepción NotFoundException si 
  no se encuentran. */
  async findByProfessional(id: string): Promise<Post[]> {
    try {
      const posts = await this.postModel.find({ idProfessional: id });
      if (posts.length == 0) {
        throw new NotFoundException(`Posts by professional #${id} not found`);
      }
      return posts;
    } catch (err) {
      console.error(
        `Error occurred while finding posts by Professional #${id}: `,
        err,
      );
      throw err;
    }
  }

  /* Encuentra las publicaciones por una categoría específica.
  Utiliza la enumeración CategoriesEnum para verificar la categoría.
  Devuelve las publicaciones encontradas o lanza una excepción NotFoundException 
  si no se encuentran. */
  async findByCategory(
    category: string,
    page: string,
    limit: string,
  ): Promise<Post[]> {
    try {
      const categoryEnum = CategoriesEnum[category];
      console.log(categoryEnum, limit, page);
      const pageInt = parseInt(page);
      const limitInt = parseInt(limit);
      const skip = (pageInt - 1) * limitInt;
      const posts = await this.postModel
        .find({
          category: { $all: categoryEnum },
        })
        .skip(skip)
        .limit(limitInt)
        .lean();

      if (posts.length == 0) {
        throw new NotFoundException(
          `Posts with category #${category} not found`,
        );
      }

      /* Paginación */
      // const postTotal = await this.postModel.countDocuments({
      //   category: { $all: categoryEnum },
      // });
      // const pageTotal = ((postTotal / limitInt) | 0) + 1;
      // return {
      //   pageTotal,
      //   postTotal,
      //   pageNum: pageInt,
      //   limitNum: limitInt,
      //   data: posts,
      // };
      return posts;
    } catch (err) {
      console.error(
        `Error occurred while finding posts with category #${category}: `,
        err,
      );
      throw err;
    }
  }

  /* Actualiza una publicación existente por su ID.
  Utiliza el modelo de Mongoose para encontrar y actualizar la publicación.
  Devuelve la publicación actualizada o lanza una excepción NotFoundException 
  si no se encuentra la publicación. */
  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
      const post = await this.postModel
        .findByIdAndUpdate(id, updatePostDto, {
          new: true,
        })
        .exec();
      if (!post) {
        throw new NotFoundException(`Post #${id} not found`);
      }
      return post;
    } catch (err) {
      console.error(`Error occurred while updating Post Post #${id}:`, err);
      throw err;
    }
  }

  /* Agrega nuevos comentarios a una publicación.
  Verifica si el comentario ya existe y actualiza su respuesta si es necesario.
  Si el comentario no existe, se agrega como un nuevo comentario a la publicación.
  Devuelve un mensaje y los comentarios actualizados. */
  async newComments(userPayload: any, idPost: string, newComments: CommentDto) {
    try {
      let existe = false;
      const comment = await this.postModel.findById(idPost);
      if (!comment) throw new BadRequestException('post no exist');

      if (comment.idProfessional.toString() === userPayload.id) {
        for (let i = 0; i < comment.comments.length; i++) {
          const comentario = comment.comments[i];
          if (comentario.id == newComments.id) {
            console.log('entre');
            // Se encuentra el comentario, se actualiza la propiedad answer
            comentario.answer = newComments.answer;
            existe = true;
            break;
          }
        }
      }
      if (existe === true) {
        await comment.updateOne(comment);
        return {
          message: 'add answer successfully',
          comments: comment.comments,
        };
      }
      // No se encontró el comentario, se agrega un nuevo comentario
      newComments.id = comment.comments.length + 1;
      comment.comments.push(newComments);
      await comment.updateOne(comment);
      return {
        message: 'add new comment successfully',
        comments: comment.comments,
      };
    } catch (error) {
      throw error;
    }
  }

  /* Elimina una publicación por su ID.
  Verifica si la publicación existe antes de eliminarla.
  Devuelve la publicación eliminada. */
  async remove(id: string) {
    try {
      const post = await this.postModel.findById(id);
      if (!post) {
        throw new NotFoundException(`Post post #${id} not found`);
      }
      const postDeleted = await this.postModel.findByIdAndDelete(id).exec();
      return postDeleted;
    } catch (err) {
      console.error('Error occurred while deleting post:', err);
      throw err;
    }
  }

  /* Guarda la URL de una imagen asociada a una publicación.
  Encuentra la publicación por su ID y actualiza su campo imagePost con la URL 
  proporcionada.*/
  async saveImagePost(urlFile: string, idPost: string) {
    const data = await this.postModel.findById(idPost).exec();
    data.imagePost = urlFile;
    data.save();
  }

  /* Verifica los permisos de seguridad para una publicación.
  Compara el ID del usuario con el ID del profesional que creó la publicación.
  Devuelve true si el usuario tiene permiso, false si no. */
  async security(userPayload: any, idPost: string) {
    const { id } = userPayload;
    const data = await this.postModel.findById(idPost).exec();
    if (!data) return false;
    if (data.idProfessional.toString() !== id) return false;
    return true;
  }
}
