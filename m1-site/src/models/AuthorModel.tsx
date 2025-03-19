import { BookModel } from "./BookModel";

export type AuthorModel = {
    id: string;
    firstName: string;
    lastName: string;
    biography: string;
    books?: BookModel[]; // Tableau des IDs des livres de cet auteur
};
