import { createproductDto } from './dto/create-product.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';

@Injectable()
export class ProductService {

  private Product: []; // Correction de la déclaration du tableau
  
  /*create(createproductDto: createproductDto){

const newproduct={id: Date.now(),...createproductDto};
this.Product.push(newproduct);
return newproduct;


  }*/

async findAll(): Promise<Product[]> {
  return this.productModel.find().exec();
}
  
  
  
  
  
  
  
  
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  // Create a new product
  async create(data: any): Promise<Product> {
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }

  // Find all products
  

  // Find a product by ID
  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  // Update a product by ID
  async update(id: string, data: any): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // Delete a product by ID
  async delete(id: string): Promise<any> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
