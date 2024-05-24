import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('songs')
export class SongEntity {
  constructor(song: Partial<SongEntity>) {
    Object.assign(this, song);
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('varchar', { array: true })
  artists: string[];

  @Column({ type: 'date' })
  realisedDate: Date;

  @Column({ type: 'time' })
  duration: Date;

  @Column({ type: 'text' })
  lirics: string;
}
