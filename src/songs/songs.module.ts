import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongEntity } from './entities/song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SongEntity])],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
