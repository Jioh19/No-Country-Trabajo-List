import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/infrastructure/db/schemas/post.schema';
import { User, UserSchema } from 'src/infrastructure/db/schemas/user.schema';
import { CloudinaryProvider } from './cloudinary.provider';
import { UserController } from './user.controller';
import { UserService } from './user.service';
@Module({
  // Importa otros módulos requeridos por este módulo
  imports: [
    ConfigModule.forRoot(), // Importa el módulo Config para acceder a variables de entorno
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Importa el módulo Mongoose para acceder a los modelos y esquemas de usuario
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]), // Importa el módulo Mongoose para acceder a los modelos y esquemas de publicaciones
  ],
  // Exporta los servicios que pertenecen a este módulo
  exports: [UserService, CloudinaryProvider],
  // Controladores que pertenecen a este módulo
  controllers: [UserController],
  // Servicios que pertenecen a este módulo
  providers: [UserService, CloudinaryProvider],
})
export class UserModule {}
