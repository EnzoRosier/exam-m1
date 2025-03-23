import React, { FC, useEffect, useState } from "react";
import { BookModel, CreateBookModel } from "../../models/BookModel";
import { AuthorModel } from "../../models/AuthorModel";
import axios from "axios";
import Modal from "./Modal";
import { Button } from "../Button";

type Props = {
    onSubmit: (newBook: CreateBookModel) => void;
    hide: () => void;
    show: boolean;
};

const CreateBookModal: FC<Props> = ({ onSubmit, hide, show }) => {
    const [authors, setAuthors] = useState<AuthorModel[]>([]);
    const [newBook, setNewBook] = useState<CreateBookModel>({
        title: "",
        yearPublished: 0,
        authorId: "",
        price: 0,
    });

    const handleSubmit = () => {
        setNewBook({
            title: "",
            yearPublished: 0,
            authorId: "",
            price: 0,
        });
        hide();
        onSubmit(newBook);
    };

    const loadAuthors = () => {
        axios.get("http://localhost:3001/authors").then((result) => {
            setAuthors(result.data);
        });
    };

    useEffect(() => {
        loadAuthors();
    }, []);

    return (
        <Modal show={show} hide={() => hide()}>
            <div className="grid grid-cols-2 gap-4 text-black">
                <input
                    value={newBook.title}
                    onChange={(e) =>
                        setNewBook((prev) => ({
                            ...prev,
                            title: e.target.value,
                        }))
                    }
                    placeholder="Title"
                />
                <input
                    type="number"
                    onChange={(e) =>
                        setNewBook((prev) => ({
                            ...prev,
                            yearPublished: parseInt(e.target.value, 10),
                        }))
                    }
                    placeholder="Year of publication"
                />
                <input
                    type="number"
                    onChange={(e) =>
                        setNewBook((prev) => ({
                            ...prev,
                            price: parseInt(e.target.value, 10),
                        }))
                    }
                    placeholder="Price"
                />
                <select
                    value={newBook.authorId}
                    onChange={(e) =>
                        setNewBook((prev) => ({
                            ...prev,
                            authorId: e.target.value,
                        }))
                    }
                >
                    <option value="">Please select an author</option>
                    {authors.map((author) => (
                        <option key={author.id} value={author.id}>
                            {author.firstName} {author.lastName}
                        </option>
                    ))}
                </select>
                <Button color="bg-blue-500" colorHover="bg-blue-600" onClick={() => handleSubmit()}>
                    Confirm
                </Button>
                <Button
                    color="bg-red-500"
                    colorHover="bg-red-600"
                    onClick={() => hide}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    );
};

export default CreateBookModal;
