import React, { FC, useEffect, useState } from "react";
import { BookModel, CreateBookModel } from "../../models/BookModel";
import { AuthorModel, CreateAuthorModel } from "../../models/AuthorModel";
import axios from "axios";
import Modal from "./Modal";
import { Button } from "../Button";

type Props = {
    onSuppr: () => void; //deletes in db
    hide: () => void; //hides the modal
    show: boolean; //indicates if shown or not
    children: string;
};

export const RemoveModal: FC<Props> = ({ onSuppr, hide, show, children }) => {

    //Submit the removal to db
    const handleSubmit = () => {
        hide();
        onSuppr();
    };
    
    return (
        <Modal show={show} hide={() => hide()}>
            <h3>{children}</h3>
            <br />
            <div className="grid grid-cols-2 gap-4">
                {/* Cancel input */}
                <Button
                    onClick={() => hide()}
                    color="bg-blue-600"
                    colorHover="bg-blue-800"
                >
                    Cancel
                </Button>
                {/* Confirm input */}
                <Button
                    onClick={() => handleSubmit()}
                    color="bg-red-600"
                    colorHover="bg-red-800"
                >
                    Confirm
                </Button>
            </div>
        </Modal>
    );
};
