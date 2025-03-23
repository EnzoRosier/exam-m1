"use client";

import axios from "axios";
import GlobalLayout from "../../../src/components/GlobalLayout";
import { BookList } from "../../components/BookList";
import CreateBookModal from "../../components/modales/CreateBookModal";
import { Title } from "../../components/Title";
import { BookModel, CreateBookModel } from "../../models/BookModel";
import { useEffect, useState } from "react";
import { SearchBar } from "../../components/SearchBar";
import { Sorter } from "../../components/Sorter";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { Button } from "../../components/Button";

const BookPage = () => {
    const [books, setBooks] = useState<BookModel[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<BookModel[]>([]);
    const [search, setSearch] = useState("");
    const sortTypes = ["asc", "desc"];
    const [sort, setSort] = useState("asc");
    const [showModal, setShowModal] = useState(false)

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
        setFilteredBooks(
            books.filter((book) => {
                return book.title.toLowerCase().includes(search.toLowerCase());
            })
        );
    };

    const sortListBook = (sort: string) => {
        setSort(sort);
        console.log("sort", filterBooks);
        if (sort === "asc") {
            setBooks([...books].sort((a, b) => a.title.localeCompare(b.title)));
            setFilteredBooks(
                [...filteredBooks].sort((a, b) =>
                    a.title.localeCompare(b.title)
                )
            );
        } else {
            setBooks([...books].sort((a, b) => b.title.localeCompare(a.title)));
            setFilteredBooks(
                [...filteredBooks].sort((a, b) =>
                    b.title.localeCompare(a.title)
                )
            );
        }
        console.log("sort", filteredBooks);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <GlobalLayout>
            <Breadcrumbs tree={[]} curr={"Book list page"} />
            <div className="grid grid-cols-2">
                <Title>List of Books :</Title>
                <Button color="bg-green-500" colorHover="bg-green-700" onClick={() => setShowModal(true)}>Add book</Button>
            </div>
            <br />
            <br />
            <div className="grid grid-cols-2 w-1/2 space-x-2 mb-2">
                <SearchBar
                    onSearch={(s) => filterBooks(books, s)}
                    search={search}
                >
                    Search books
                </SearchBar>
                <Sorter
                    sort={sort}
                    sortTypes={sortTypes}
                    setSort={(s) => sortListBook(s)}
                ></Sorter>
            </div>
            <BookList
                bookList={search === "" ? books : filteredBooks}
            ></BookList>
            <CreateBookModal onSubmit={(e) => onCreate(e)} hide={() => setShowModal(false)} show={showModal}></CreateBookModal>
        </GlobalLayout>
    );
};

export default BookPage;
