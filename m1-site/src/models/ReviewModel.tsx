import { BookModel } from "../models/BookModel";

//Model for review
export type ReviewModel = {
    id: string;
    title: string;
    comment: string;
    rating: number;
    book: BookModel;
    date: Date;
}

//Model to create a review
export type CreateReviewModel = {
    title: string;
    comment: string;
    rating: number;
    book: BookModel;
    date: Date;
}
