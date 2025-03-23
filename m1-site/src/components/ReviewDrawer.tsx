import { FC, useEffect, useState } from "react";
import { ReviewList } from "./ReviewList";
import { CreateReviewModel, ReviewModel } from "../models/ReviewModel";
import { Button } from "./Button";
import { AddReviewModal } from "./modales/AddReviewModal";
import { BookModel } from "../models/BookModel";
import { Sorter } from "./Sorter";

type Props = {
    reviewList: ReviewModel[]; //List of reviews
    book: BookModel; //Current book
    onAddReview: (newReview: CreateReviewModel) => void; //to add a review to a book
};

//Show a drawer containing reviews of a book
export const ReviewDrawer: FC<Props> = ({ reviewList, book, onAddReview }) => {
    const [show, setShow] = useState(false); //indicates if visible
    const [showAdd, setShowAdd] = useState(false); //idicates if add modal should be visible
    const sortTypes = ["asc", "desc"]; //Types of sort
    const [sort, setSort] = useState("asc"); //curent sort
    const [reviews, setReviews] = useState(reviewList) //list of reviews
    
    useEffect(() => (
        setReviews(reviewList)
    ), [reviewList])

    //Sort reviews
    const sortListReview = (sort: string) => {
        setSort(sort);
        if (sort === "asc") {
            setReviews([...reviews].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
        } else {
            setReviews([...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        }
    };

    return (
        <div>
            <Button
                color={`fixed bg-stone-800 top-10 right-10`}
                onClick={() => setShow(!show)}
            >
                Show Reviews
            </Button>
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
                <Button color="bg-green-500 ml-4 mb-4" colorHover="bg-green-600" onClick={() => setShowAdd(true)}>Add Review</Button>
                <ReviewList reviewList={reviews} />
                
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
