import { Injectable } from '@nestjs/common';
import { BookModel, UpdateBookModel } from './book.model';
import { CreateBookDto } from './book.dto';
import { BookEntity } from '../database/entities/book.entity';
import { DataSource } from 'typeorm';
import { AuthorEntity } from '../database/entities/author.entity';

@Injectable()
export class BookRepository {
  private readonly bookRepository = this.dataSource.getRepository(BookEntity)
  private readonly authorRepository = this.dataSource.getRepository(AuthorEntity)

  constructor(private readonly dataSource : DataSource){};

  private books: BookModel[] = [];

  public async getBooks(): Promise<BookModel[]> {
    return this.bookRepository.find({
      relations : {author : true}
  });
  }

  public async getBookById(id: string): Promise<BookModel | null> {
    return this.bookRepository.findOneOrFail({
      where : {id}, 
      relations : {author : true}
  });
  }

  public async getBooksByName(name: string): Promise<BookModel[]> {
    return this.books.filter((book) => book.title.includes(name));
  }

  public async createBook(book: CreateBookDto): Promise<BookModel> {
           // On va commencer par chercher l'auteur de ce livre dans la DB
           const author = await this.authorRepository.findOne({where : {id :book.authorId}})
           // Maintenant on peut créer une nouvelle entrée d'un livre et la sauvegarder
           const newBook = this.bookRepository.create({
               title : book.title,
               yearPublished : book.yearPublished,
               price : book.price,
               author : author
           });
           const returnedBook = this.bookRepository.save(newBook);
   
           return returnedBook;
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
