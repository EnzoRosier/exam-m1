import { FC } from "react";
import "./GlobalLayout.css";
import { ReviewModel } from "../models/ReviewModel";

type Props = {
    reviewList: ReviewModel[];
};

//Show the list of review
export const ReviewList: FC<Props> = ({ reviewList }) => {
    return reviewList.length === 0 ? (
        <div>No reviews for this book</div>
    ) : (
        <>
            <ul className="space-y-2">
                {reviewList?.map((review) => (
                    <li
                        className="bg-stone-400 text-black p-3 "
                        key={review.id}
                    >
                        <span className="font-bold text-xl">
                            {review.rating}/5 : {review.title}
                        </span>
                        <br />
                        <span>"{review.comment}"</span>
                        <br />
                        <span> date : {review.date.toLocaleString("fr-CA").split("T")[0]}</span>
                    </li>
                ))}
            </ul>
        </>
    );
};
