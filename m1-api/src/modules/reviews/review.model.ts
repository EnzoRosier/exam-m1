import { BookEntity } from "../database/entities/book.entity";

export type ReviewModel = {
    id: string;
    title: string;
    comment: string;
    rating: number;
    book: BookEntity;
    date: Date;
}

export type CreateReviewModel = {
    title: string;
    comment: string;
    rating: number;
    book: BookEntity;
    date: Date;
}
