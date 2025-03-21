import { FC, useEffect, useState } from "react";
import "./GlobalLayout.css";
import { BookModel } from "../models/BookModel";
import { useRouter } from "next/navigation";

type Props = {
    bookList: BookModel[];
};

export const BookList: FC<Props> = ({ bookList }) => {
    const router = useRouter();
    useEffect(() => {
        console.log("BookList", bookList);
    }, [bookList]);

    const openBookDetails = (bookId: string) => {
        router.push(`/book/${bookId}`);
    };

    return bookList.length === 0 ? (
        <div>No books to display</div>
    ) : (
        <ul className="space-y-2">
            {bookList?.map((book) => (
                <li
                    className="bg-stone-400 text-black p-3 "
                    key={book.id}
                    onClick={() => openBookDetails(book.id)}
                >
                    <span className="font-bold text-xl">{book.title}</span>
                    <br />
                    <span>
                        by{" "}
                        {book.author != null || book.author != null
                            ? book.author.firstName + " " + book.author.lastName
                            : "Unknown"}
                        <br />
                        published in : {book.yearPublished}
                    </span>
                    <br />
                    <span>Rating : {book.reviews.length != 0 ?  book.reviews.reduce((sum, review) => sum + review.rating, 0) / book.reviews.length : "?"}/5</span>
                </li>
            ))}
        </ul>
    );
};
