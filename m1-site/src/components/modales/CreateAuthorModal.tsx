import React, { FC, useEffect, useState } from "react";
import { BookModel, CreateBookModel } from "../../models/BookModel";
import { AuthorModel, CreateAuthorModel } from "../../models/AuthorModel";
import axios from "axios";

type Props = {
    onCreate: (input: CreateAuthorModel) => void;
};

const CreateAuthorModal: FC<Props> = ({ onCreate }) => {
    const [show, setShow] = useState(false);
    const [newAuthor, setNewAuthor] = useState<CreateAuthorModel>({
        lastName: "",
        firstName: "",
        biography: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setNewAuthor({
            lastName: "",
            firstName: "",
            biography: ""
        });
        setShow(false);
        onCreate(newAuthor);
    };

    return (
        <div>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded float-right"
                onClick={() => setShow(true)}
            >
                Create New Author
            </button>

            {show && (
                <div
                    onClick={() => setShow(false)}
                    className="z-1 absolute top-0 left-0 w-full h-full bg-stone-900 bg-opacity-50"
                >
                    <div
                        className="z-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 left-50 w-50 h-50 bg-stone-500 p-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="mb-4">Ajouter un nouvel auteur</h3>
                        <form
                            className="grid grid-cols-2 gap-4 text-black"
                            onSubmit={handleSubmit}
                        >
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
                            <input
                                value={newAuthor.biography}
                                onChange={(e) =>
                                    setNewAuthor((prev) => ({
                                        ...prev,
                                        biography: e.target.value,
                                    }))
                                }
                                placeholder="Biography"
                            />
                            <button
                                className="bg-blue-500 p-1 rounded"
                                type="submit"
                            >
                                Ajouter
                            </button>
                            <button
                                className="bg-red-500 p-1 rounded"
                                type="button"
                                onClick={() => setShow(false)}
                            >
                                Fermer
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateAuthorModal;
