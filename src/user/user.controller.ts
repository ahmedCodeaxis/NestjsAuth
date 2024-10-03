import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Créer un utilisateur
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    
    return this.userService.create(createUserDto);
  
}

  // Récupérer tous les utilisateurs
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // Récupérer un utilisateur par ID
  @Get(':id')
  findOne(@Param('id') id: String) {
    return this.userService.findOne(id);
  }

  // Mettre à jour un utilisateur par ID
  
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: any) {
    return this.userService.Update(id, updateProductDto);
  }

  // Supprimer un utilisateur par ID
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
  
}
