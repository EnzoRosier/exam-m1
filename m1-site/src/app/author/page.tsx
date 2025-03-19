"use client";

import axios from "axios";
import GlobalLayout from "../../../src/components/GlobalLayout";
import { BookList } from "../../components/BookList";
import CreateBookModal from "../../components/modales/CreateBookModal";
import { Title } from "../../components/Title";
import { BookModel, CreateBookModel } from "../../models/BookModel";
import { useEffect, useState } from "react";
import { AuthorModel, CreateAuthorModel } from "../../models/AuthorModel";
import CreateAuthorModal from "../../components/modales/CreateAuthorModal";
import { AuthorList } from "../../components/AuthorList";

const AuthorPage = () => {
    const [author, setAuthor] = useState<AuthorModel[]>([]);

    const onCreate = (input: CreateAuthorModel) => {
        axios
            .post("http://localhost:3001/authors", input)
            .then((result) => {
                fetchAuthors();
                console.log("AAA",result.data);
            })
            .catch((err) => console.error(err));
    };

    const fetchAuthors = () => {
        axios
            .get("http://localhost:3001/authors")
            .then((result) => setAuthor(result.data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchAuthors();
    }, []);

    return (
        <GlobalLayout>
            <div className="grid grid-cols-2">
                <Title>List of Authors :</Title>
                <CreateAuthorModal onCreate={onCreate}></CreateAuthorModal>
            </div>
            <br />
            <br />
            <AuthorList authorList={author}></AuthorList>
        </GlobalLayout>
    );
};

export default AuthorPage;
