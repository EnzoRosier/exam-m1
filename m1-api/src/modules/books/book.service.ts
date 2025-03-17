import { Injectable } from "@nestjs/common";
import { CreateBookDto, UpdateBookDto } from "./book.dto";
import { BookModel, CreateBookModel } from "./book.model";
import { BookRepository } from "./book.repository";

@Injectable()
export class BookService {
    constructor(private readonly bookRepository: BookRepository) {}

    public async getBooks():Promise<BookModel[]> {
        return this.bookRepository.getBooks();
    }

    public async getBookById(id : string):Promise<BookModel|undefined> {
        return this.bookRepository.getBookById(id);
    }

    public createBook(book : CreateBookModel):Promise<BookModel> {
        return this.bookRepository.createBook(book);
    }

    public updateBook(id : string, book : UpdateBookDto):void {
        this.bookRepository.updateBook(id,book);
    }

    public deleteBook(id : string) : void {
        this.bookRepository.deleteBook(id);
    }
}