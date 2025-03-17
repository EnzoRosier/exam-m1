import {IsInt, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";


// Création d'un livre
export declare class CreateBookDto {
    @IsString()
    title: string;
    @IsInt()
    @Max(2024)
    @Min(-1000)
    yearPublished: number;
    @IsNumber()
    price: number;
    @IsString()
    authorId: string;
}

// Création de plusieurs livres
export declare class CreateBooksDto {
    @IsOptional()
    book: CreateBookDto;
    @IsOptional()
    books: CreateBookDto[];
}

// Mise à jour d'un livre
export declare class UpdateBookDto {
    @IsString()
    @IsOptional()
    title: string;
    @IsInt()
    @IsOptional()
    yearPublished: number;
    @IsString()
    authorId: string;
}