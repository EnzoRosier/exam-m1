import { BookModel } from "../models/BookModel";

export type ReviewModel = {
    id: string;
    title: string;
    comment: string;
    rating: number;
    book: BookModel;
    date: Date;
}

export type CreateReviewModel = {
    title: string;
    comment: string;
    rating: number;
    book: BookModel;
    date: Date;
}
