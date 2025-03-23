import { FC, useEffect, useState } from "react";
import Modal from "./Modal";
import { AuthorModel } from "../../models/AuthorModel";
import { Button } from "../Button";

type Props = {
    show: boolean; //indicates if modal shown or not
    hide: () => void; //hides the modal
    author: AuthorModel; //Current author
    onChange: (a: AuthorModel) => void; //Function that change the author in db
};

export const EditAuthorModal: FC<Props> = ({
    show,
    hide,
    author,
    onChange,
}) => {
    const [editedAuthor, setEditedAuthor] = useState<AuthorModel>(author);

    return (
        <Modal show={show} hide={hide}>
            <div className="grid grid-col-2 gap-4 text-black">
                {/* firstname input */}
                <input
                    value={editedAuthor.firstName}
                    onChange={(e) =>
                        setEditedAuthor((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                        }))
                    }
                    placeholder="First Name"
                />
                {/* lastname input */}
                <input
                    value={editedAuthor.lastName}
                    onChange={(e) =>
                        setEditedAuthor((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                        }))
                    }
                    placeholder="Last Name"
                />
                {/* biography input */}
                <textarea
                    className="col-span-2 h-20"
                    value={editedAuthor.biography}
                    onChange={(e) =>
                        setEditedAuthor((prev) => ({
                            ...prev,
                            biography: e.target.value,
                        }))
                    }
                    placeholder="Biography"
                />
                {/* Confirm input */}
                <Button
                    color="bg-green-500"
                    onClick={() => {
                        onChange(editedAuthor);
                        hide();
                    }}
                >
                    Confirm
                </Button>
                {/* Cancel input */}
                <Button color="bg-red-500" onClick={() => hide()}>Cancel</Button>
            </div>
        </Modal>
    );
};
