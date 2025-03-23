import { AuthorModel } from "./AuthorModel";
import { ReviewModel } from "./ReviewModel";

//Model for book
export type BookModel = {
    id: string;
    title: string;
    yearPublished: number;
    author?: AuthorModel;
    price: number;
    reviews: ReviewModel[];
};

//Model to Create a book
export type CreateBookModel = {
    title: string;
    yearPublished: number;
    authorId: string;
    price: number;
};

//Model to update a book
export type EditBookModel = {
    author: {
        id: string | null
    }
}