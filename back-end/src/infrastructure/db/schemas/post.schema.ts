import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Services } from 'src/common/classes/services.class';
import { User } from './user.schema';
import { CategoriesEnum } from 'src/common/enums/categories.enum';
import { Comments } from 'src/common/classes/comments.class';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, enum: CategoriesEnum, required: true })
  category: CategoriesEnum;

  @Prop({ type: [Services] })
  services: Services[];

  @Prop({ type: String, required: true })
  nameProfessional: string;

  @Prop({
    type: String,
    default:
      'https://res.cloudinary.com/dne12pcpf/image/upload/v1708619304/trabajoListo/publicacion-vacia_npqmts.jpg',
  })
  imagePost: string;

  @Prop({ type: [Comments] })
  comments: Comments[];

  @Prop({ type: Number, default: 0 })
  views: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  idProfessional: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
