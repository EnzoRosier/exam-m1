import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AuthorEntity} from '../database/entities/author.entity';
import { AuthorModel, CreateAuthorModel } from './author.model';
import { UpdateAuthorDto } from '../authors/author.dto';

@Injectable()
export class AuthorRepository {
  private readonly authorRepository =
    this.dataSource.getRepository(AuthorEntity);

  constructor(private readonly dataSource: DataSource) {}

  // Liste des auteurs
  public async listAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.find({
      relations: ['books', 'books.reviews'], // On liste les livres associés lorsque l'on liste les auteurs
    });
  }

  //Trouver un auteur par son ID
  public async findAuthorById(id: string): Promise<AuthorModel | null> {
    let auth = await this.authorRepository.findOne({
      where: { id },
      relations: ['books', 'books.reviews'], // Include reviews of the books
    });
    console.log(auth);
    return auth;
  }

  // Créer un auteur
  public async createAuthor(input: CreateAuthorModel): Promise<AuthorModel> {
    const result = await this.authorRepository.save(
      this.authorRepository.create(input),
    );
    return result;
  }

  // Supprimer un auteur
  public async deleteAuthor(id: string): Promise<void> {
    // Chercher l'auteur avec ses livres associés
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: ['books'],
    });
  
    // Si l'auteur n'existe pas, on lance une erreur
    if (!author) {
      console.log("Author not found");
    }
  
    // Maintenant, on supprime l'auteur
    await this.authorRepository.delete(id);
  }

  // Mettre à jour les infos d'un auteur
  public async updateAuthor(id: string, updateData: UpdateAuthorDto): Promise<AuthorModel | null> {
    await this.authorRepository.update(id, updateData);
    return this.findAuthorById(id);
  }

  public async save(author: AuthorModel): Promise<AuthorModel> {
    return this.authorRepository.save(author); 
  }
  
  //Retourne les livres d'un auteur
  public async getBooksByAuthorId(id : string):Promise<AuthorModel|undefined> {
    return this.authorRepository.findOneOrFail({
        where : {id}, 
        relations : {books : true}
    });
}
}