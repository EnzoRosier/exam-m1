import { Body, Controller, Get, Post,Delete,Param,Patch} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './author.dto';
import { AuthorPresenter } from './author.presenter';
import { AuthorModel } from './author.model';


@Controller('/authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  public async listAuthors(): Promise<AuthorPresenter[]> {
    const authors = await this.authorService.listAuthors();

    return authors.map(AuthorPresenter.from);
  }

  @Post()
  public async createAuthor(
    @Body() input: CreateAuthorDto,
  ): Promise<AuthorPresenter> {
    const author = await this.authorService.createAuthor(input);

    return AuthorPresenter.from(author);
  }

  @Delete(':id')
    public async deleteBook(@Param('id') id : string) : Promise<void> {
        this.authorService.deleteAuthor(id);
    }

    @Get(':id')
    public async getAuthorById(@Param('id') id: string): Promise<AuthorPresenter | null> {
      const author = await this.authorService.getAuthorById(id);
      return author ? AuthorPresenter.from(author) : null;
    }

    @Patch(':id')
  public async updateAuthor(
    @Param('id') id: string,
    @Body() updateData: CreateAuthorDto,
  ) {
    return this.authorService.updateAuthor(id, updateData);
  }

  @Get('/book/:id')
  public async getBooksByAuthorId(@Param('id') id : string):Promise<AuthorModel | undefined>{
    return this.authorService.getBooksByAuthorId(id)
  }

  

}