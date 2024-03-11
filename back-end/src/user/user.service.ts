import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/infrastructure/db/dto/userDto/create-user.dto';
import { UpdateUserDto } from 'src/infrastructure/db/dto/userDto/update-user.dto';
import { Post } from 'src/infrastructure/db/schemas/post.schema';
import { User } from 'src/infrastructure/db/schemas/user.schema';

const streamifier = require('streamifier');
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}
  //  Crea y registra un usuario en la base de datos
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const saltOrRounds = Number(process.env.BCRYPT_ENV);
      const { password } = createUserDto;
      createUserDto.password = await bcrypt.hash(password, saltOrRounds);

      const createdUser = new this.userModel(createUserDto);
      if (!createdUser) throw new BadRequestException();
      return createdUser.save();
    } catch (error) {
      throw new Error(error);
    }
  }
  // Busca todos los usuarios con una paginacion
  async findAll(page: string, limit: string): Promise<User[]> {
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const skip = (pageInt - 1) * limitInt;
    const usersProfessionals = await this.userModel
      .find({ isProfessional: true })
      .skip(skip)
      .limit(limitInt)
      .lean()
      .select('-password');
    return usersProfessionals;
  }
  // Busca un usuario por id
  async findId(id: string): Promise<any> {
    try {
      const user = await this.userModel.findById(id).lean().select('-password');
      if (!user) {
        throw new NotFoundException(`User user #${id} not found`);
      }
      return user;
    } catch (err) {
      console.error(`Error occurred while finding User #${id}: `, err);
      throw err;
    }
  }
  // Busca un usuario atravez del email
  async findEmail(email: string): Promise<any> {
    try {
      const user = await this.userModel.findOne({ email: email }).exec();
      if (!user) {
        throw new NotFoundException(`User user ${email} not found`);
      }
      return user;
    } catch (err) {
      console.error(`Error occurred while finding User ${email}: `, err);
      throw err;
    }
  }
  // Borra un usuario con el id del usuario
  async delete(id: string): Promise<Object> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException(`User user #${id} not found`);
      }
      const userDeleted = await this.userModel.findByIdAndDelete(id).exec();
      await this.postModel.deleteMany({ idProfessional: user._id });
      return {
        message: 'user remove',
        user: userDeleted,
        posts: 'all posts a user deleted sucessfully',
      };
    } catch (err) {
      console.error('Error occurred while deleting user:', err);
      throw err;
    }
  }
  // actualiza el usuario y actualiza el password
  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const { password } = updateUserDto;
      if (password != undefined) {
        const saltOrRounds = Number(process.env.BCRYPT_SALT);
        updateUserDto.password = await bcrypt.hash(password, saltOrRounds);
      }
      const user = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, {
          new: true,
        })
        .exec();
      if (!user) {
        throw new NotFoundException(`User #${id} not found`);
      }
      return user;
    } catch (err) {
      console.error(`Error occurred while updating User User #${id}:`, err);
      throw err;
    }
  }
  // Guarda la imagen en el servicio cloudinary
  uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise<UploadApiResponse | UploadApiErrorResponse>(
      (resolve, reject) => {
        const uploadOptions = {
          folder: 'trabajoListo',
        };
        const uploadStream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      },
    );
  }
  // Guarda el enlace de la imagen en la base de datos
  async saveImageProfile(urlFile: string, id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException(`User user #${id} not found`);
    user.imageProfile = urlFile;
    user.save();
  }
}
