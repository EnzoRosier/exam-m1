import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from '../database/entities/author.entity';
import { AuthorRepository } from './author.repository';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity])],
  providers: [AuthorRepository, AuthorService],
  controllers: [AuthorController],
  exports: [AuthorService],
})
export class AuthorModule {}