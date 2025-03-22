import { AuthorModel } from "./AuthorModel";
import { ReviewModel } from "./ReviewModel";

export type BookModel = {
    id: string;
    title: string;
    yearPublished: number;
    author?: AuthorModel;
    price: number;
    reviews: ReviewModel[];
};

export type CreateBookModel = {
    title: string;
    yearPublished: number;
    authorId: string;
    price: number;
};

export type EditBookModel = {
    author: {
        id: string | null
    }
}