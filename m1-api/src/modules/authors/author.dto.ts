import { IsArray, IsOptional, IsString } from "class-validator";

export declare class CreateAuthorDto{
    @IsString()
    firstName : string;
    @IsString()
    lastName : string;
    @IsString()
    biography : string;
    @IsOptional()
    @IsArray()
    bookIds?: string[];
}

export class UpdateAuthorDto {
    @IsOptional()
    @IsString()
    firstName?: string;
  
    @IsOptional()
    @IsString()
    lastName?: string;
  
    @IsOptional()
    @IsString()
    biography?: string;
  
    @IsOptional()
    @IsArray()
    bookIds?: string[];
  }