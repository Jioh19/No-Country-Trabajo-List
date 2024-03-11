import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Category } from 'src/common/classes/category.class';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({
    unique: true,
    required: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Number })
  phone?: number;

  @Prop({
    type: String,
    default:
      'https://res.cloudinary.com/dne12pcpf/image/upload/v1708098888/trabajoListo/l8klbjwse7bpxebfrq4y.png',
  })
  imageProfile: string;

  @Prop({ type: Boolean, default: false })
  isProfessional?: boolean;

  @Prop({ type: [Category] })
  category?: Category[];

  @Prop({ type: String })
  address?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
