import { useParams, useRouter } from "next/navigation";
import { Title } from "./Title";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookModel, EditBookModel } from "../models/BookModel";
import { ReviewDrawer } from "./ReviewDrawer";
import Modal from "./modales/Modal";
import { Button } from "./Button";
import { RemoveModal } from "./modales/RemoveModal";
import { CreateReviewModel } from "../models/ReviewModel";
import { AuthorModel } from "../models/AuthorModel";
import { EditAuthorModal } from "./modales/EditAuthorModal";
import { EditAuthorBook } from "./EditAuthorBooks";
import { Breadcrumbs } from "./Breadcrumbs";

export const AuthorDetails = () => {
    const [showSupprModal, setShowSupprModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [author, setAuthor] = useState<AuthorModel | null>(null);
    const [reviewList, setReviewList] = useState([]);
    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        fetchAuthor();
    }, []);

    const fetchAuthor = () => {
        axios
            .get(`http://localhost:3001/authors/${id}`)
            .then((result) => setAuthor(result.data))
            .catch((err) => console.error(err));
    };

    const onSuppr = () => {
        axios
            .delete(`http://localhost:3001/authors/${id}`)
            .then((result) => {
                router.push("/authors");
            })
            .catch((err) => console.error(err));
    };

    const onChange = (a: AuthorModel) => {
        axios
            .patch(`http://localhost:3001/authors/${id}`, a)
            .then((result) => {
                fetchAuthor();
            })
            .catch((err) => console.error(err));
    };

    const onChangeBook = (a: EditBookModel, idBook:string) => {
        axios
            .patch(`http://localhost:3001/books/${idBook}`, a)
            .then((result) => {
                fetchAuthor();
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            {author == null ? (
                <Title>Loading...</Title>
            ) : (
                <>
                    <Breadcrumbs tree={[{name:"Author list page", link:"/author"}]} curr={author.firstName + " " + author.lastName} />
                    <Title>
                        {author.firstName + " " + author.lastName + "'s details"}
                    </Title>
                    <br />
                    <p>Biography : {author.biography}</p>
                    <p>
                        {author.books == null ||
                        author.books?.length === 0 ||
                        author.books?.filter((book) => book.reviews.length >= 0)
                            .length === 0
                            ? "No book or reviews found "
                            : "Average ratings : " +
                              author.books.filter((b) => b.reviews.length !== 0).reduce(
                                  (sum1, book) =>
                                      sum1 +
                                      book.reviews.reduce(
                                          (sum, review) => sum + review.rating,
                                          0
                                      ) /
                                          book.reviews.length,
                                  0
                              ) /
                                  author.books.filter((b) => b.reviews.length !== 0).length}
                    </p>
                    <EditAuthorBook
                        author={author}
                        onChange={(a, idBook) => onChangeBook(a, idBook)}
                    ></EditAuthorBook>
                    <br />
                    <br />
                    <Button
                        onClick={() => setShowSupprModal(true)}
                        color="bg-red-500 mr-4"
                        colorHover="bg-red-600"
                    >
                        Remove this author
                    </Button>
                    <Button
                        onClick={() => setShowEditModal(true)}
                        color="bg-green-500"
                        colorHover="bg-green-600"
                    >
                        Edit this author
                    </Button>
                    <EditAuthorModal
                        show={showEditModal}
                        hide={() => setShowEditModal(false)}
                        author={author}
                        onChange={(a) => onChange(a)}
                    ></EditAuthorModal>
                    <RemoveModal
                        onSuppr={() => onSuppr()}
                        hide={() => setShowSupprModal(false)}
                        show={showSupprModal}
                    >
                        Are you sure you want to delete this author from the
                        library ?
                    </RemoveModal>
                </>
            )}
        </div>
    );
};
