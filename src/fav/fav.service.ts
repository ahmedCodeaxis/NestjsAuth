import { Injectable } from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';
import {Fav} from '../fav/entities/fav.entity'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { promises } from 'dns';


@Injectable()
export class FavService {
  
  
  constructor(
    @InjectModel(Fav.name) private readonly FavModel: Model<Fav>,
  ) {}
  async create(createFavDto:CreateFavDto ): Promise<Fav> {

    const newFav = new this. FavModel(createFavDto);
    
    return newFav.save();
  }
 
  async findAll():Promise<Fav []>{
    return this.FavModel.find().exec();
  }


  async findOne(id: String  ): Promise<Fav> {
    //return `This action returns a #${id} fav`;
    return this.FavModel.findById(id).exec();
  }
 

  async update(id: String, updateFavDto: UpdateFavDto): Promise<Fav> {
   // return `This action updates a #${id} fav`;
   return this.FavModel.findByIdAndUpdate(id,updateFavDto,{new:true}).exec();
   
  
  }

  async remove(id: String):Promise<Fav | string> {
   // return `This action removes a #${id} fav`;
    return this.FavModel.findByIdAndDelete(id).exec()+"user #${id} deleted";
  }
}
