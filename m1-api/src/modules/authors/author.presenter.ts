import { AuthorModel } from './author.model';

export class AuthorPresenter {
  id: string;
  firstName: string;
  lastName: string;
  biography: string;
  books: {
    id: string;
    title: string;
    yearPublished: number;
    price: number;
    reviews: { comment: string; rating: number }[];
  }[];

  private constructor(author: AuthorPresenter) {
    Object.assign(this, author);
  }

  public static from(author: AuthorModel): AuthorPresenter {
    return new AuthorPresenter({
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      biography: author.biography,
      books: author.books?.map((book) => ({
        id: book.id,
        title: book.title,
        yearPublished: book.yearPublished,
        price: book.price,
        reviews: book.reviews?.map((review) => ({
          comment: review.comment,
          rating: review.rating
        })) || [] // S'assure que reviews est toujours un tableau
      })) || [] // S'assure que books est toujours un tableau
    });
  }
}
