
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  password: string;
  @Prop({ default: 'client' }) // Le rôle par défaut est client
  role: string;

  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop() 
  customId: number;
  
}

export const UserSchema = SchemaFactory.createForClass(User);
