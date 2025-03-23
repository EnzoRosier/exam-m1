import { Injectable } from "@nestjs/common";
import { CreateReviewDto } from './review.dto';
import { ReviewEntity } from '../database/entities/review.entity';
import { DataSource } from 'typeorm';
import { BookEntity } from '../database/entities/book.entity';
import { ReviewModel } from './review.model';

@Injectable()
export class ReviewRepository {
    private readonly reviewRepository = this.dataSource.getRepository(ReviewEntity);
    private readonly bookRepository = this.dataSource.getRepository(BookEntity);
    
    constructor(private readonly dataSource: DataSource) {}
    // création d'une review
    public async createReview(bookId: string, reviewDto: CreateReviewDto): Promise<ReviewModel> {
        const { title,comment, rating, date } = reviewDto;
        const book = await this.bookRepository.findOne({ where: { id: bookId } });
    
        if (!book) {
          throw new Error('Book not found');
        }
    
        const review = this.reviewRepository.create({
          title,
          comment,
          rating,
          date,
          book,
        });
        return this.reviewRepository.save(review);
    }
    
    // liste des reviews d'un livre en paramètre
    public async getBookReviews(bookId: string): Promise<ReviewEntity[]> {
        return this.reviewRepository.find({
            where: { book: { id: bookId } },
        });
    }
    
}