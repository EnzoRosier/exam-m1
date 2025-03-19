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
    const [filteredBooks, setFilteredBooks] = useState<BookModel[]>([]);
    const [search, setSearch] = useState("");

    const onCreate = (input: CreateBookModel) => {
        axios
            .post("http://localhost:3001/books", input)
            .then((result) => {
                fetchBooks();
                console.log("AAA", result.data);
            })
            .catch((err) => console.error(err));
    };

    const fetchBooks = () => {
        axios
            .get("http://localhost:3001/books")
            .then((result) => setBooks(result.data))
            .catch((err) => console.error(err));
    };

    const filterBooks = (books: BookModel[], search: string) => {
        setSearch(search);
        setFilteredBooks(books.filter((book) => {
            return book.title.toLowerCase().includes(search.toLowerCase());
        }));
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
            <input
                className="text-black mb-2"
                placeholder="Search Book"
                type="text"
                onChange={(e) => filterBooks(books, e.target.value)}
            ></input>
            
            <BookList bookList={ search === "" ? books : filteredBooks }></BookList>
        </GlobalLayout>
    );
};

export default BookPage;
