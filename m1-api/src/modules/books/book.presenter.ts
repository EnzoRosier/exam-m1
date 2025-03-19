import { BookModel } from './book.model';

export class BookPresenter {
  id: string;
  title: string;
  yearPublished: number;
  author: {
    firstName: string;
    lastName: string;
  };

  private constructor(data: BookPresenter) {
    Object.assign(this, data);
  }

  public static from(data: BookModel) {
    return new BookPresenter({
      id: data.id,
      title: data.title,
      yearPublished : data.yearPublished,
      author : data.author
    });
  }
}