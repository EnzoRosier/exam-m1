import { FC, useEffect, useState } from "react";
import { BookModel } from "../models/BookModel";

type Props = {
    onChange: (book: BookModel | undefined) => void; //Change the current selected book
    bookList: BookModel[]; //list of books
};
//Selection of books withour an author
export const FreeBookSelect: FC<Props> = ({ onChange, bookList }) => {
    const [freeBookList, setFreeBookList] = useState(bookList)

    useEffect(() => (
        setFreeBookList(bookList)
    ), [bookList])

    return (
        <select
            defaultValue={""}
            className="text-black mr-4"
            onChange={(e) => {
                onChange(freeBookList.find((a) => a.id === e.target.value));
            }}
        >
            <option value="" disabled hidden>
                Select a book
            </option>
            {freeBookList.map((book) => (
                <option key={book.id} value={book.id}>
                    {book.title}
                </option>
            ))}
        </select>
    );
};
