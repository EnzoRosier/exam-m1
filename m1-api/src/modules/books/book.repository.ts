import { Injectable } from '@nestjs/common';
import { BookModel, CreateBookModel, UpdateBookModel } from './book.model';
import { v4 } from 'uuid';

@Injectable()
export class BookRepository {
  private books: BookModel[] = [];

  public async getBooks(): Promise<BookModel[]> {
    return this.books;
  }

  public async getBookById(id: string): Promise<BookModel | null> {
    return this.books.find((book) => book.id === id);
  }

  public async createBook(input: CreateBookModel): Promise<BookModel> {
    this.books.push({ id: v4(), ...input });

    return this.books[this.books.length - 1];
  }

  public async updateBook(
    id: string,
    input: UpdateBookModel,
  ): Promise<BookModel | null> {
    const bookIndex = this.books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      return null;
    }

    this.books[bookIndex] = { ...this.books[bookIndex], ...input };

    return this.books[bookIndex];
  }

  public async deleteBook(id: string): Promise<void> {
    this.books = this.books.filter((book) => book.id !== id);
  }
}
