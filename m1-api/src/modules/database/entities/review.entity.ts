import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BookEntity } from './book.entity';

@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => BookEntity, (book) => book.reviews, { onDelete: "CASCADE", nullable: false })
  @JoinColumn({ name: 'book_id' })
  book: BookEntity;
}