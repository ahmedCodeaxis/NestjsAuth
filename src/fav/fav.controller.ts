import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavService } from './fav.service';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';
import { Fav } from './entities/fav.entity';
import { promises } from 'dns';

@Controller('fav')
export class FavController {
  constructor(private readonly favService: FavService) {}

  @Post()
  async create(@Body() createFavDto: CreateFavDto): Promise<Fav> {
    return this.favService.create(createFavDto);
  }

  @Get()
  async findAll():Promise<Fav []> {
    return this.favService.findAll();
  }

  @Get(':id')
 async findOne(@Param('id') id: string): Promise<Fav> {
    return this.favService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFavDto: UpdateFavDto): Promise<Fav> {
    return this.favService.update(id, updateFavDto);
  }

  
  @Delete(':id')
async remove(@Param('id') id: string): Promise<Fav | string> {
  return this.favService.remove(id);
}

}
