import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { promises } from 'dns';
@Injectable()
export class UserService {
  private user = [];

  // Créer un nouvel utilisateur
 /* create(createUserDto: CreateUserDto) {
    const newUser = { id: Date.now(), ...createUserDto };
    this.users.(newUser);
    return newUser;
  }
*/
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
  ) {}

  // Create a new product
  async create(data: any): Promise<User> {
    const newProduct = new this.UserModel(data);
    return newProduct.save();
  }

  // Récupérer tous les utilisateurs
  /*findAll() {
    return this.user;
  }*/
  
async findAll(): Promise<User[]>{
  return this.UserModel.find().exec();
}

  

  

  async findOne(id: String): Promise <User>{
    return this.UserModel.findById(id).exec();
  }

 
  // Mettre à jour un utilisateur par ID

  async Update(id:string,data:any):Promise <User>{
    return this.UserModel.findByIdAndUpdate(id,data,{new:true}).exec();
  }


  // Supprimer un utilisateur par ID
  /*remove(id: number) {
    const index = this.user.findIndex(user => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.user.splice(index, 1);
    return { message: `User with ID ${id} deleted` };
  }*/
 
    async delete(id: string): Promise<any> {
      return this.UserModel.findByIdAndDelete(id).exec();
    }
}