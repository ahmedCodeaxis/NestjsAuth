import { Product } from './../../product/product.schema';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument, mongo } from 'mongoose';


export type favDocument = HydratedDocument<Fav>;
 
@Schema()
export class Fav extends Document {

    @Prop()
    Productdescription: string;
    
  @Prop({type: mongoose.Schema.Types.ObjectId , ref:'Product'})
  idProduct : Product

}

export const FavSchema = SchemaFactory.createForClass(Fav);
