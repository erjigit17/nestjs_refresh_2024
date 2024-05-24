import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

import { SongEntity } from './entities/song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(SongEntity)
    private readonly songRepository: Repository<SongEntity>,
  ) {}

  async create(createSongDto: CreateSongDto) {
    return await this.songRepository.save(createSongDto);
  }

  async findAll() {
    return this.songRepository.find();
  }

  async findOne(id: number) {
    const song = this.songRepository.findOneBy({ id });
    if (song) {
      return song;
    }
    throw new NotFoundException(`Song with id ${id} not found`);
  }

  async update(id: number, updateSongDto: UpdateSongDto) {
    const song = await this.songRepository
      .createQueryBuilder()
      .update(SongEntity)
      .set(updateSongDto)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    if (song.affected === 0) {
      throw new NotFoundException(`Song with id ${id} not found`);
    }

    return song.raw[0]; // Return the updated song data
  }

  async remove(id: number) {
    const song = await this.songRepository
      .createQueryBuilder()
      .delete()
      .from(SongEntity)
      .where('id = :id', { id })
      .returning('*')
      .execute();
    if (song.affected === 0) {
      throw new NotFoundException(`Song with id ${id} not found`);
    }
    return song.raw[0]; // Return the deleted song data
  }
}
