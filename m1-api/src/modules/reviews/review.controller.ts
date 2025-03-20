import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { ReviewModel } from "./review.model";

@Controller('/reviews')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Get(':id')
    public async getReviews(@Param('id') id: string): Promise<ReviewModel[]> {
        return this.reviewService.getReviews(id);
    }

    @Post(':id')
    public async createReview(@Param('id') id: string, @Body() review: ReviewModel): Promise<ReviewModel> {
        return this.reviewService.createReview(id, review);
    }
}