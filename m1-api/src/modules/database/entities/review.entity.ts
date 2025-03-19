import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BookEntity } from './book.entity';

@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'date' })
  date: string;

  @ManyToOne(() => BookEntity, (book) => book.reviews, { nullable: false })
  @JoinColumn({ name: 'book_id' })
  book: BookEntity;
}