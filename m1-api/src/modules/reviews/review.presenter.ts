import { ReviewEntity } from '../database/entities/review.entity';


export class ReviewPresenter {
  
  static presentReview(review: ReviewEntity) {
    return {
      id: review.id,
      comment: review.comment,
      rating: review.rating,
      date: review.date, 
      book: {
        id: review.book.id,
        title: review.book.title,
        yearPublished: review.book.yearPublished,
      },
    };
  }


  static presentReviews(reviews: ReviewEntity[]) {
    return reviews.map(review => this.presentReview(review));
  }
}