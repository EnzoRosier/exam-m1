"use client";

import axios from "axios";
import GlobalLayout from "../../../src/components/GlobalLayout";
import { BookList } from "../../components/BookList";
import CreateBookModal from "../../components/modales/CreateBookModal";
import { Title } from "../../components/Title";
import { BookModel, CreateBookModel } from "../../models/BookModel";
import { useEffect, useState } from "react";

const BookPage = () => {
    const [books, setBooks] = useState<BookModel[]>([]);

    const onCreate = (input: CreateBookModel) => {
        axios
            .post("http://localhost:3001/books", input)
            .then((result) => {
                fetchBooks();
                console.log("AAA",result.data);
            })
            .catch((err) => console.error(err));
    };

    const fetchBooks = () => {
        axios
            .get("http://localhost:3001/books")
            .then((result) => setBooks(result.data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <GlobalLayout>
            <div className="grid grid-cols-2">
                <Title>List of Books :</Title>
                <CreateBookModal onCreate={onCreate}></CreateBookModal>
            </div>
            <br />
            <br />
            <BookList bookList={[]}></BookList>
        </GlobalLayout>
    );
};

export default BookPage;
