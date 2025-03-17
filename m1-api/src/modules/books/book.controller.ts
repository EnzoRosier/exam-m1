import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
//import { patch } from 'axios';
import { CreateBookDto, UpdateBookDto } from './book.dto';
import { BookService } from './book.service';
import { BookModel, CreateBookModel } from './book.model';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get()
    public async listBooks(): Promise<BookModel[]> {
        return this.bookService.getBooks();
    }

    @Get(':id')
    public async getBook(@Param('id') id: string): Promise<BookModel | null> {
      return this.bookService.getBookById(id);
    }
  
    @Post()
    public async createBook(@Body() input: CreateBookModel): Promise<BookModel> {
      return this.bookService.createBook(input);
    }
  
    @Patch(':id')
    public async updateBooks(
      @Param('id') id: string,
      @Body() input: UpdateBookDto,
    ) {
      return this.bookService.updateBook(id, input);
    }
  
    @Delete(':id')
    public async deleteBook(@Param('id') id: string): Promise<void> {
      await this.bookService.deleteBook(id);
    }
}