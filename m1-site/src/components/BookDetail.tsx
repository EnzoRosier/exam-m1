import { useParams } from "next/navigation";
import { Title } from "./Title";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookModel } from "../models/BookModel";
import { ReviewDrawer } from "./ReviewDrawer";

export const BookDetails = () => {
    const [book, setBook] = useState<BookModel | null>(null);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3001/books/${id}`)
            .then((result) => setBook(result.data))
            .catch((err) => console.error(err));
    }, [id]);

    return (
        <div>
            {book == null ? (
                <Title>Loading...</Title>
            ) : (
                <>
                    <Title>{book.title + " details"}</Title>
                    <br />
                    <span>By {book.author.firstName}  {book.author.lastName}</span>
                    <br />
                    <span>Published in : {book.yearPublished}</span>
                    <br />
                    <span>{book.price}€</span>
                    <ReviewDrawer></ReviewDrawer>
                    
                </>
            )}
        </div>
    );
};
