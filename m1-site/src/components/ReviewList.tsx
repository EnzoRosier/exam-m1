import { FC, useEffect, useState } from "react";
import "./GlobalLayout.css";
import { BookModel } from "../models/BookModel";
import { useRouter } from "next/navigation";
import { ReviewModel } from "../models/ReviewModel";
import { Button } from "./Button";
import { AddReviewModal } from "./modales/AddReviewModal";
import { SearchBar } from "./SearchBar";

type Props = {
    reviewList: ReviewModel[];
};

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
                        <span> date : {review.date.toString()}</span>
                    </li>
                ))}
            </ul>
        </>
    );
};
