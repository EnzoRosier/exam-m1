import { BookModel } from "./BookModel";

//Author Model
export type AuthorModel = {
    id: string;
    firstName: string;
    lastName: string;
    biography: string;
    books?: BookModel[];
};

//model to create an author
export type CreateAuthorModel = {
    firstName: string;
    lastName: string;
    biography: string; 
    books?: BookModel[]
  };
