import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { SongDto } from './dto/soungDto';

@Injectable()
export class SongsService {
  // local db
  private songs: SongDto[] = [];
  private idIndex = (() => {
    let index = 1;
    return () => index++;
  })();

  create(createSongDto: CreateSongDto) {
    const newSong = {
      ...createSongDto,
      id: this.idIndex(),
    };
    this.songs.push(newSong);
    return newSong;
  }

  findAll() {
    return this.songs;
  }

  findOne(id: number) {
    const song = this.songs.find((song) => song.id === id);
    if (song) {
      return song;
    }
    throw new NotFoundException(`Song with id ${id} not found`);
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    const oldSongIndex = this.songs.findIndex((song) => song.id === id);
    if (oldSongIndex !== -1) {
      this.songs[oldSongIndex] = {
        ...this.songs[oldSongIndex],
        ...updateSongDto,
      };
      return this.songs[oldSongIndex];
    }
    throw new NotFoundException(`Song with id ${id} not found`);
  }

  remove(id: number) {
    const deletedSongIndex = this.songs.findIndex((song) => song.id === id);
    if (deletedSongIndex !== -1) {
      return this.songs.splice(deletedSongIndex)[0];
    }
    throw new NotFoundException(`Song with id ${id} not found`);
  }
}
