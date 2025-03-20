import React, { FC, useEffect, useState } from "react";
import { BookModel, CreateBookModel } from "../../models/BookModel";
import { AuthorModel, CreateAuthorModel } from "../../models/AuthorModel";
import axios from "axios";
import Modal from "./Modal";
import { Button } from "../Button";

type Props = {
    onSuppr: () => void;
    hide: () => void;
    show: boolean;
    children: string;
};

export const RemoveModal: FC<Props> = ({ onSuppr, hide, show, children }) => {

    const handleSubmit = () => {
        hide();
        onSuppr();
    };

    return (
        <Modal show={show} hide={() => hide()}>
            <h3>{children}</h3>
            <br />
            <div className="grid grid-cols-2 gap-4">
                <Button
                    onClick={() => hide()}
                    color="bg-blue-600"
                    colorHover="bg-blue-800"
                >
                    Cancel
                </Button>
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
