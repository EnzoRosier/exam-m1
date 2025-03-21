import { FC, useState } from "react";
import { ReviewList } from "./ReviewList";
import { CreateReviewModel, ReviewModel } from "../models/ReviewModel";
import { Button } from "./Button";
import { AddReviewModal } from "./modales/AddReviewModal";
import { BookModel } from "../models/BookModel";

type Props = {
    reviewList: ReviewModel[];
    book: BookModel;
    onAddReview: (newReview:CreateReviewModel) => void;
};

export const ReviewDrawer: FC<Props> = ({ reviewList, book, onAddReview }) => {
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false)

    

    return (
        <div>
            <button
                className="bg-stone-800 text-white p-4 rounded-full"
                onClick={() => setShow(!show)}
            >
                Show Reviews
            </button>
            <div
                className={`fixed bottom-0 right-0 left-0 bg-stone-800 text-white p-4 rounded-lg w-screen h-1/2 transform transition-transform duration-300 ${
                    show ? "translate-y-0" : "translate-y-full"
                }`}
            >
                <ReviewList reviewList={reviewList} />
                <Button onClick={() => setShowAdd(true)}>
                    Add Review
                </Button>
                <AddReviewModal
                    onSubmit={(r) => onAddReview(r)}
                    hide={() => setShowAdd(false)}
                    show={showAdd}
                    book={book}
                >Add Review</AddReviewModal>
            </div>
        </div>
    );
};
