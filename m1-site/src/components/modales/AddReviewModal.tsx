import React, { FC, useEffect, useState } from "react";
import { BookModel, CreateBookModel } from "../../models/BookModel";
import { AuthorModel, CreateAuthorModel } from "../../models/AuthorModel";
import axios from "axios";
import Modal from "./Modal";
import { Button } from "../Button";
import { CreateReviewModel, ReviewModel } from "../../models/ReviewModel";

type Props = {
    onSubmit: (newReview:CreateReviewModel) => void; //function that send the new review to the db
    hide: () => void; //function that hides the modal
    show: boolean; //function that tells if the modal must be shown
    children: string;
    book: BookModel; //Curent book to add the review to
};

//modal to add a review
export const AddReviewModal: FC<Props> = ({
    onSubmit,
    hide,
    show,
    children,
    book,
}) => {
    const [newReview, setNewReview] = useState<CreateReviewModel>({
        title: "",
        rating: 1,
        comment: "",
        book: book,
        date: new Date(Date.now())
    });

    //Submit new review
    const handleSubmit = () => {
        if (newReview.rating > 0 && newReview.rating < 6) {
            hide();
            onSubmit(newReview);
        }

    };

    return (
        <Modal show={show} hide={() => hide()}>
            <h3>{children}</h3>
            <br />
            <div className="grid grid-cols-2 gap-4">
                <form
                    className="grid grid-cols-2 gap-4 text-black"
                    onSubmit={handleSubmit}
                >
                    {/* title input */}
                    <input
                        value={newReview.title}
                        onChange={(e) =>
                            setNewReview((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))
                        }
                        placeholder="Review title"
                    />
                    {/* rating input */}
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={newReview.rating || ""}
                        onChange={(e) =>
                            setNewReview((prev) => ({
                                ...prev,
                                rating: parseInt(e.target.value, 10),
                            }))
                        }
                    />
                    {/* comment input */}
                    <textarea
                        className="col-span-2 h-20"
                        value={newReview.comment}
                        onChange={(e) =>
                            setNewReview((prev) => ({
                                ...prev,
                                comment: e.target.value,
                            }))
                        }
                        placeholder="Biography"
                    />
                    {/* cancel input */}
                    <Button
                        onClick={() => hide()}
                        color="bg-blue-600"
                        colorHover="bg-blue-800"
                    >
                        Cancel
                    </Button>
                    {/* submit input */}
                    <Button
                        onClick={() => handleSubmit()}
                        color="bg-red-600"
                        colorHover="bg-red-800"
                    >
                        Confirm
                    </Button>
                </form>
            </div>
        </Modal>
    );
};
