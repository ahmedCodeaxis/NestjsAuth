import { Module } from '@nestjs/common';
import { FavService } from './fav.service';
import { FavController } from './fav.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Fav, FavSchema } from '../fav/entities/fav.entity';
@Module({
  imports: [MongooseModule.forFeature([{ name: Fav.name, schema: FavSchema }])],

  controllers: [FavController],
  providers: [FavService],
})
export class FavModule {
  
}
