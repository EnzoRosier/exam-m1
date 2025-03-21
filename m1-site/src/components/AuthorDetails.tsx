import { useParams, useRouter } from "next/navigation";
import { Title } from "./Title";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookModel } from "../models/BookModel";
import { ReviewDrawer } from "./ReviewDrawer";
import Modal from "./modales/Modal";
import { Button } from "./Button";
import { RemoveModal } from "./modales/RemoveModal";
import { CreateReviewModel } from "../models/ReviewModel";
import { AuthorModel } from "../models/AuthorModel";

export const AuthorDetails = () => {
    const [showSupprModal, setShowSupprModal] = useState(false);
    const [author, setAuthor] = useState<AuthorModel | null>(null);
    const [reviewList, setReviewList] = useState([]);
    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        axios
            .get(`http://localhost:3001/authors/${id}`)
            .then((result) => setAuthor(result.data))
            .catch((err) => console.error(err));
    }, [id]);

    const onSuppr = () => {
        axios
            .delete(`http://localhost:3001/author/${id}`)
            .then((result) => {
                router.push("/authors");
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            {author == null ? (
                <Title>Loading...</Title>
            ) : (
                <>
                    <Title>{author.firstName + " " + author.lastName + " details"}</Title>
                    <br />
                    <span>
                        {author.biography}
                    </span>
                    <br />
                    <Button
                        onClick={() => setShowSupprModal(true)}
                        color="bg-red-600"
                        colorHover="bg-red-700"
                    >
                        Remove this author
                    </Button>
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
