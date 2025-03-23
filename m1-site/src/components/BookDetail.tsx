import { useParams, useRouter } from "next/navigation";
import { Title } from "./Title";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookModel } from "../models/BookModel";
import { ReviewDrawer } from "./ReviewDrawer";
import { Button } from "./Button";
import { RemoveModal } from "./modales/RemoveModal";
import { CreateReviewModel } from "../models/ReviewModel";
import { Breadcrumbs } from "./Breadcrumbs";

//Show detail of a book
export const BookDetails = () => {
    const [showSupprModal, setShowSupprModal] = useState(false); //show delete modal
    const [book, setBook] = useState<BookModel | null>(null); //Current book
    const [reviewList, setReviewList] = useState([]); //list of reviews
    const { id } = useParams(); //Current id of books
    const router = useRouter();

    //Fetch book at start
    useEffect(() => {
        axios
            .get(`http://localhost:3001/books/${id}`)
            .then((result) => setBook(result.data))
            .catch((err) => console.error(err));
        fetchReviews();
    }, [id]);

    //Request to fetch reviews
    const fetchReviews = () => {
        axios
            .get(`http://localhost:3001/reviews/${id}`)
            .then((result) => setReviewList(result.data))
            .catch((err) => console.error(err));
    };

    //Request to delete book
    const onSuppr = () => {
        axios
            .delete(`http://localhost:3001/books/${id}`)
            .then((result) => {
                router.push("/books");
            })
            .catch((err) => console.error(err));
    };

    //request to add a review
    const onAddReview = (newReview: CreateReviewModel) => {
        axios
            .post(`http://localhost:3001/reviews/${id}`, newReview)
            .then((result) => {
                fetchReviews();
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            {book == null ? (
                //Waiting for load
                <Title>Loading...</Title>
            ) : (
                <>
                    <Breadcrumbs
                        tree={[{ name: "Book list page", link: "/books" }]}
                        curr={book.title}
                    />
                    <Title>{book.title + " details"}</Title>
                    <br />
                    <span>
                        {book.author == null ? (
                            <span>The author of this book is unknown</span>
                        ) : (
                            <>
                                <span>By </span>
                                <span
                                    className="underline text-blue-700 cursor-pointer"
                                    onClick={() =>
                                        router.push(
                                            `/authors/${book.author?.id}`
                                        )
                                    }
                                >
                                    {book.author == null
                                        ? "Unknown"
                                        : book.author.firstName +
                                          " " +
                                          book.author.lastName}
                                </span>
                            </>
                        )}
                    </span>
                    <br />
                    <span>Published in : {book.yearPublished}</span>
                    <br />
                    <span>Price : {book.price}€</span>
                    <br />
                    <Button
                        onClick={() => setShowSupprModal(true)}
                        color="bg-red-600"
                        colorHover="bg-red-700"
                    >
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
                    <ReviewDrawer
                        reviewList={reviewList}
                        book={book}
                        onAddReview={(r) => onAddReview(r)}
                    ></ReviewDrawer>
                </>
            )}
        </div>
    );
};
