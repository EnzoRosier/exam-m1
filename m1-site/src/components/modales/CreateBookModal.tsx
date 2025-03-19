import React, { FC, useEffect, useState } from "react";
import { BookModel, CreateBookModel } from "../../models/BookModel";
import { AuthorModel } from "../../models/AuthorModel";
import axios from "axios";

type Props = {
    onCreate: (input: CreateBookModel) => void;
};

const CreateBookModal: FC<Props> = ({ onCreate }) => {
    const [authors, setAuthors] = useState<AuthorModel[]>([]);
    const [show, setShow] = useState(false);
    const [newBook, setNewBook] = useState<CreateBookModel>({
        title: "",
        yearPublished: 0,
        authorId: "",
        price: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setNewBook({
            title: "",
            yearPublished: 0,
            authorId: "",
            price: 0,
        });
        setShow(false);
        onCreate(newBook);
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
        <div>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded float-right"
                onClick={() => setShow(true)}
            >
                Create New Book
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
                        <h3 className="mb-4">Ajouter un nouveau livre</h3>
                        <form
                            className="grid grid-cols-2 gap-4 text-black"
                            onSubmit={handleSubmit}
                        >
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
                                value={newBook.yearPublished}
                                onChange={(e) =>
                                    setNewBook((prev) => ({
                                        ...prev,
                                        yearPublished: parseInt(
                                            e.target.value,
                                            10
                                        ),
                                    }))
                                }
                                placeholder="Year of publication"
                            />
                            <input
                                value={newBook.price}
                                onChange={(e) =>
                                    setNewBook((prev) => ({
                                        ...prev,
                                        price: parseInt(
                                            e.target.value,
                                            10
                                        ),
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
                                <option value="">
                                    Please select an author
                                </option>
                                {authors.map((author) => (
                                    <option key={author.id} value={author.id}>
                                        {author.firstName} {author.lastName}
                                    </option>
                                ))}
                            </select>
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

export default CreateBookModal;
