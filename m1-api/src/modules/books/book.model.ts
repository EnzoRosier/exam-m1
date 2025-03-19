import { AuthorModel } from '../authors/author.model';

// modèle d'un livre
export type BookModel = {
  id: string;
  title: string;
  yearPublished: number;
  price: number;
  author: AuthorModel;
};

// modèle pour créer un livre
export type CreateBookModel = {
  title: string;
  yearPublished: number;
  price: number;
  author: AuthorModel;
};

// modèle pour mettre à jour un livre
export type UpdateBookModel = Partial<CreateBookModel>;