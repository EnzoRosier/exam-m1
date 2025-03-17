// modèle de l'auteur d'un livre
export type BookAuthorModel = {
  firstName: string;
  lastName: string;
};

// modèle d'un livre
export type BookModel = {
  id: string;
  title: string;
  yearPublished: number;
  author: BookAuthorModel;
};

// modèle pour créer un livre
export type CreateBookModel = {
  title: string;
  yearPublished: number;
  author: BookAuthorModel;
};

// modèle pour mettre à jour un livre
export type UpdateBookModel = Partial<CreateBookModel>;