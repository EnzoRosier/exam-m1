import { Injectable } from "@nestjs/common";
import { ReviewModel } from "./review.model";
import { ReviewRepository } from "./review.repository";

@Injectable()
export class ReviewService {
    constructor(private readonly reviewRepository: ReviewRepository) {}
    public async getReviews(id : string):Promise<ReviewModel[]> {
        return this.reviewRepository.getBookReviews(id);
    }

    public async createReview(bookId: string, reviewDto: ReviewModel): Promise<ReviewModel> {
        return this.reviewRepository.createReview(bookId, reviewDto);
    }
}