import { useParams, useRouter } from "next/navigation";
import { Title } from "./Title";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookModel } from "../models/BookModel";
import { ReviewDrawer } from "./ReviewDrawer";
import Modal from "./modales/Modal";
import { Button } from "./Button";
import { RemoveModal } from "./modales/RemoveModal";

export const BookDetails = () => {
    const [showSupprModal, setShowSupprModal] = useState(false);
    const [book, setBook] = useState<BookModel | null>(null);
    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        axios
            .get(`http://localhost:3001/books/${id}`)
            .then((result) => setBook(result.data))
            .catch((err) => console.error(err));
    }, [id]);

    const onSuppr = () => {
        axios
            .delete(`http://localhost:3001/books/${id}`)
            .then((result) => {
                router.push("/book");
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            {book == null ? (
                <Title>Loading...</Title>
            ) : (
                <>
                    <Title>{book.title + " details"}</Title>
                    <br />
                    <span>
                        By <span className="underline text-blue-700 cursor-pointer" onClick={() => router.push(`/author/${book.author.id}`)}>{book.author.firstName} {book.author.lastName}</span>
                    </span>
                    <br />
                    <span>Published in : {book.yearPublished}</span>
                    <br />
                    <span>{book.price}€</span>
                    <br />
                    <Button onClick={() => setShowSupprModal(true)} color="bg-red-600" colorHover="bg-red-700">
                        Remove this book
                    </Button>
                    <RemoveModal
                        onSuppr={() => onSuppr()}
                        hide={() => setShowSupprModal(false)}
                        show={showSupprModal}
                    >
                        Are you sure you want to delete this book from the
                        library ?
                    </RemoveModal>
                    <ReviewDrawer></ReviewDrawer>
                </>
            )}
        </div>
    );
};
