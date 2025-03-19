import { FC, useEffect, useState } from "react";
import "./GlobalLayout.css";
import { BookModel } from "../models/BookModel";

type Props = {
    bookList: BookModel[];
};

export const BookList: FC<Props> =  ( { bookList }) => {
    return (
        <ul className="space-y-2">
            {bookList.map((book) => (
                <li className="bg-stone-400 text-black p-3 " key={book.id}>
                    <span className="font-bold text-xl">{book.title}</span>
                    <br />
                    <span>
                        by {book.author.firstName} {book.author.lastName},
                        {book.yearPublished}
                    </span>
                    <br />
                    <span>Rating : 69/5</span>
                </li>
            ))}
        </ul>
    );
};
