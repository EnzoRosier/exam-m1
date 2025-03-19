import { BookModel } from "./BookModel";

export type AuthorModel = {
    id: string;
    firstName: string;
    lastName: string;
    biography: string;
    books?: BookModel[];
};

export type CreateAuthorModel = {
    firstName: string;
    lastName: string;
    biography: string; 
    books?: BookModel[]
  };
