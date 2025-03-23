import { FC, useEffect, useState } from "react";
import { AuthorModel } from "../models/AuthorModel";
import { Button } from "./Button";
import { BookModel, EditBookModel } from "../models/BookModel";
import axios from "axios";
import { FreeBookSelect } from "./FreeBookSelect";
import { useRouter } from "next/navigation";

type Props = {
    author: AuthorModel;
    onChange: (book: EditBookModel, idBook: string) => void;
};

// Interface to edit the books of an author
export const EditAuthorBook: FC<Props> = ({ author, onChange }) => {
    const [editedAuthor, setEditedAuthor] = useState(author); //Current author
    const [freeBook, setFreeBook] = useState<BookModel[]>([]); //Books without author
    const [selectedBook, setSelectedBook] = useState<BookModel | null>(); //current selected book
    const router = useRouter();

    // Fetch books at start
    useEffect(() => {
        fetchBooks();
    }, []);

    // Request to fetch books without an author
    const fetchBooks = () => {
        axios
            .get(`http://localhost:3001/books/`)
            .then((result) =>
                setFreeBook(
                    result.data.filter((book: BookModel) => book.author == null)
                )
            )
            .catch((err) => console.error(err));
    };

    //Request to remove a book from an author
    const removeBook = (book: BookModel, idBook: string) => {
        onChange({ author: { id: null } }, idBook);
        setFreeBook(freeBook.concat(book));
    };

    //Request to add a book to an author
    const addBook = () => {
        if (selectedBook != null) {
            onChange({ author: { id: editedAuthor.id } }, selectedBook.id);
            console.log(freeBook.filter((b) => selectedBook.id !== b.id));
            setFreeBook(freeBook.filter((b) => selectedBook.id !== b.id));
        }
    };

    return (
        <>
            {author.books == null || author.books.length === 0 ? (
                ""
            ) : (
                <>
                    <p>{author.firstName + " " + author.lastName}'s books : </p>
                    <ul>
                        {author.books.map((book) => (
                            <li
                                className="flex items-center justify-between bg-stone-400 text-black p-1 h-100 cursor-pointer"
                                onClick={() => router.push(`/books/${book.id}`)}
                                key={book.id}
                            >
                                {book.title}{" "}
                                <div className="float-right" onClick={(e) => e.stopPropagation()}>
                                    <Button
                                        color="bg-red-500"
                                        colorHover="bg-red-600"
                                        onClick={() =>
                                            removeBook(book, book.id)
                                        }
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            <FreeBookSelect
                onChange={(e) =>
                    e === undefined ? console.log("ERROR") : setSelectedBook(e)
                }
                bookList={freeBook}
            ></FreeBookSelect>
            <Button
                color="bg-green-500"
                colorHover="bg-green-600"
                onClick={() => addBook()}
            >
                Add Book
            </Button>
        </>
    );
};
