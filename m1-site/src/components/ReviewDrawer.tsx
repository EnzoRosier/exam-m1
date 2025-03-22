import { FC, useEffect, useState } from "react";
import { ReviewList } from "./ReviewList";
import { CreateReviewModel, ReviewModel } from "../models/ReviewModel";
import { Button } from "./Button";
import { AddReviewModal } from "./modales/AddReviewModal";
import { BookModel } from "../models/BookModel";
import { Sorter } from "./Sorter";

type Props = {
    reviewList: ReviewModel[];
    book: BookModel;
    onAddReview: (newReview: CreateReviewModel) => void;
};

export const ReviewDrawer: FC<Props> = ({ reviewList, book, onAddReview }) => {
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const sortTypes = ["asc", "desc"];
    const [sort, setSort] = useState("asc");
    const [reviews, setReviews] = useState(reviewList)

    useEffect(() => (
        setReviews(reviewList)
    ), [reviewList])

    const sortListReview = (sort: string) => {
        setSort(sort);
        if (sort === "asc") {
            setReviews([...reviews].sort((a, b) => a.rating - b.rating));
        } else {
            setReviews([...reviews].sort((a, b) => b.rating - a.rating));
        }
    };

    return (
        <div>
            <button
                className="bg-stone-800 text-white p-4 rounded-full"
                onClick={() => setShow(!show)}
            >
                Show Reviews
            </button>
            <div
                className={`fixed bottom-0 right-0 left-0 bg-stone-800 text-white p-4 rounded-lg w-screen h-1/2 transform overflow-y-scroll transition-transform duration-300 ${
                    show ? "translate-y-0" : "translate-y-full"
                }`}
            >
                <Sorter
                    sort={sort}
                    sortTypes={sortTypes}
                    setSort={(s) => sortListReview(s)}
                ></Sorter>
                <ReviewList reviewList={reviews} />
                <Button onClick={() => setShowAdd(true)}>Add Review</Button>
                <AddReviewModal
                    onSubmit={(r) => onAddReview(r)}
                    hide={() => setShowAdd(false)}
                    show={showAdd}
                    book={book}
                >
                    Add Review
                </AddReviewModal>
            </div>
        </div>
    );
};
