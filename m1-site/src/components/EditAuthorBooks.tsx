import { FC, useEffect, useState } from "react";
import { AuthorModel } from "../models/AuthorModel";
import { Button } from "./Button";
import { BookModel, EditBookModel } from "../models/BookModel";
import axios from "axios";

type Props = {
    author: AuthorModel;
    onChange: (book: EditBookModel, idBook: string) => void;
};

export const EditAuthorBook: FC<Props> = ({ author, onChange }) => {
    const [editedAuthor, setEditedAuthor] = useState(author);
    const [freeBook, setFreeBook] = useState<BookModel[]>([]);
    const [selectedBook, setSelectedBook] = useState<BookModel | null>();

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        axios
            .get(`http://localhost:3001/books/`)
            .then((result) => setFreeBook(result.data.filter((book: BookModel) => book.author == null)))
            .catch((err) => console.error(err));
    }

    const removeBook = (book: BookModel, idBook: string) => {
        onChange({ author: { id: null } }, idBook);
        fetchBooks();
    };

    const addBook = () => {
        if (selectedBook != null) {
            onChange({ author: { id: editedAuthor.id } }, selectedBook.id);
            fetchBooks();
        }
    };

    return (
        <>
            {author.books == null || author.books.length === 0 ? (
                ""
            ) : (
                <ul>
                    {author.books.map((book) => (
                        <li key={book.id}>
                            {book.title}{" "}
                            <Button onClick={() => removeBook(book, book.id)}>
                                Remove
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
            <select
                className="text-black"
                onChange={(e) => {
                    setSelectedBook(
                        freeBook.find((a) => a.id === e.target.value)
                    );
                }}
            >
                {freeBook.map((book) => (
                        <option key={book.id} value={book.id}>
                            {book.title}
                        </option>
                    ))}
            </select>
            <Button onClick={() => addBook()}>Add Book</Button>
        </>
    );
};
