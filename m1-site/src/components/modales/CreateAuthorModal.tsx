import React, { FC, useEffect, useState } from "react";
import { BookModel, CreateBookModel } from "../../models/BookModel";
import { AuthorModel, CreateAuthorModel } from "../../models/AuthorModel";
import axios from "axios";
import Modal from "./Modal";
import { Button } from "../Button";

type Props = {
    onSubmit: (newAuthor: CreateAuthorModel) => void; //Function that sends the request to create the author
    hide: () => void; //Function that hides the modal
    show: boolean; //tells if the modal is visible or not
};

//Modal to create a new author
const CreateAuthorModal: FC<Props> = ({ onSubmit, hide, show }) => {
    const [newAuthor, setNewAuthor] = useState<CreateAuthorModel>({
        lastName: "",
        firstName: "",
        biography: "",
    });

    //Submit the new author
    const handleSubmit = () => {
        setNewAuthor({
            lastName: "",
            firstName: "",
            biography: "",
        });
        hide();
        onSubmit(newAuthor);
    };

    return (
        <div>
            <Modal show={show} hide={() => hide()}>
                <div className="grid grid-col-2 gap-4 text-black">
                    {/* firstname input */}
                    <input
                        value={newAuthor.firstName}
                        onChange={(e) =>
                            setNewAuthor((prev) => ({
                                ...prev,
                                firstName: e.target.value,
                            }))
                        }
                        placeholder="First Name"
                    />
                    {/* lastname input */}
                    <input
                        value={newAuthor.lastName}
                        onChange={(e) =>
                            setNewAuthor((prev) => ({
                                ...prev,
                                lastName: e.target.value,
                            }))
                        }
                        placeholder="Last Name"
                    />
                    {/* biography input */}
                    <textarea
                        className="col-span-2 h-20"
                        value={newAuthor.biography}
                        onChange={(e) =>
                            setNewAuthor((prev) => ({
                                ...prev,
                                biography: e.target.value,
                            }))
                        }
                        placeholder="Biography"
                    />
                    {/* submit input */}
                    <Button
                        color="bg-blue-500"
                        colorHover="bg-blue-600"
                        onClick={() => handleSubmit()}
                    >
                        Create author
                    </Button>
                    {/* cancel input */}
                    <Button
                        color="bg-red-500"
                        colorHover="bg-red-600"
                        onClick={() => hide()}
                    >
                        Cancel
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default CreateAuthorModal;
