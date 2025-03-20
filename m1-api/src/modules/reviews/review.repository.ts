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
    
    async createReview(bookId: string, reviewDto: CreateReviewDto): Promise<ReviewModel> {
        const { title,comment, rating, date } = reviewDto;
    
        
        const book = await this.bookRepository.findOne({ where: { id: bookId } });
    
        if (!book) {
          throw new Error('Book not found');
        }
    
        // Créer un nouvel avis
        const review = this.reviewRepository.create({
          title,
          comment,
          rating,
          date,
          book,
        });
    
        // Sauvegarder
        return this.reviewRepository.save(review);
    }
    
    async getBookReviews(bookId: string): Promise<ReviewEntity[]> {
        return this.reviewRepository.find({
            where: { book: { id: bookId } },
        });
    }
    
}