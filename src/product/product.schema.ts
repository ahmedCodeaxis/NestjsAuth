// src/product/product.schema.ts

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop() 
  customId: number;
  
}

export const ProductSchema = SchemaFactory.createForClass(Product);
