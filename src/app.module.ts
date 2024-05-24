import { Module } from '@nestjs/common';
import { SongsModule } from './songs/songs.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    SongsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
