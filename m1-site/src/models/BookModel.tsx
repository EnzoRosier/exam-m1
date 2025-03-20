import { AuthorModel } from "./AuthorModel";

export type BookModel = {
    id: string;
    title: string;
    yearPublished: number;
    author: AuthorModel;
    price: number;
};

export type CreateBookModel = {
    title: string;
    yearPublished: number;
    authorId: string;
    price: number;
};
