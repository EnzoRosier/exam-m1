import { FC, useEffect, useState } from "react";
import Modal from "./Modal";
import { AuthorModel } from "../../models/AuthorModel";
import { Button } from "../Button";

type Props = {
    show: boolean;
    hide: () => void;
    author: AuthorModel;
    onChange: (a: AuthorModel) => void;
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
                <Button
                    onClick={() => {
                        onChange(editedAuthor);
                        hide();
                    }}
                >
                    Change
                </Button>
                <Button onClick={() => hide()}>Cancel</Button>
            </div>
        </Modal>
    );
};
