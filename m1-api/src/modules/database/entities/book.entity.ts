import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AuthorEntity } from './author.entity';
import { ReviewEntity } from './review.entity';

@Entity('books')
export class BookEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'year_published', type: 'int', nullable : true })
  yearPublished: number;

  @Column({ name: 'price', type: 'float', nullable : true })
  price: number;

  @ManyToOne(() => AuthorEntity, {nullable:true})
  @JoinColumn({ name : 'author_id'})
  author : AuthorEntity

  @OneToMany(() => ReviewEntity, (review) => review.book)
  reviews: ReviewEntity[];
}