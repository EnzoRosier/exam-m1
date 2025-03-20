import {IsDate, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { BookEntity } from "../database/entities/book.entity";

export declare class CreateReviewDto {
    @IsString()
    title: string;
    @IsString()
    comment: string;
    @IsInt()
    @Max(5)
    @Min(0)
    rating: number;
    book: BookEntity;
    @IsDate()
    date: Date;
}

export declare class UpdateReviewDto {
    @IsOptional()
    @IsString()
    title?: string;
    @IsOptional()
    @IsString()
    content?: string;
    @IsOptional()
    @IsInt()
    @Max(5)
    @Min(1)
    rating?: number;
    @IsOptional()
    book?: BookEntity;
    @IsOptional()
    @IsDate()
    date?: Date;
}