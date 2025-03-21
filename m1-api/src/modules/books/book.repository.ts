import { Injectable } from '@nestjs/common';
import { BookModel } from './book.model';
import { CreateBookDto, UpdateBookDto } from './book.dto';
import { BookEntity } from '../database/entities/book.entity';
import { DataSource } from 'typeorm';
import { AuthorEntity } from '../database/entities/author.entity';

@Injectable()
export class BookRepository {
  private readonly bookRepository = this.dataSource.getRepository(BookEntity)
  private readonly authorRepository = this.dataSource.getRepository(AuthorEntity)

  constructor(private readonly dataSource : DataSource){};

  private books: BookModel[] = [];

  //liste des livres
  public async getBooks(): Promise<BookModel[]> {
    return this.bookRepository.find({
      relations : {author : true, reviews : true}
      
  });
  }
  //récupère un livre par son ID
  public async getBookById(id: string): Promise<BookModel | null> {
    return this.bookRepository.findOneOrFail({
      where : {id}, 
      relations : {author : true, reviews : true}
  });
  }
  //création d'un livre
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

  //update d'un livre
  public async updateBook(id : string, newData : UpdateBookDto):Promise<void> {
    await this.bookRepository.update(id,newData)
}
  //suppression d'un livre
  public async deleteBook(id : string) : Promise<void> {
    await this.bookRepository.delete(id);
  }
}
