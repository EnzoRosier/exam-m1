import { FC, useEffect, useState } from "react";
import "./GlobalLayout.css";
import { AuthorModel } from "../models/AuthorModel";
import { useRouter } from "next/navigation";

type Props = {
    authorList: AuthorModel[];
};

export const AuthorList: FC<Props> = ({ authorList }) => {
    const router = useRouter();
    useEffect(() => {
        console.log("authorList", authorList);
    }, [authorList]);

    return authorList.length === 0 ? (
        <div>No authors to display</div>
    ) : (
        <ul className="space-y-2">
            {authorList?.map((author) => (
                <li className="bg-stone-400 text-black p-3 " key={author.id} onClick={() => router.push(`author/${author.id}`)}>
                    <span className="font-bold text-xl">{author.firstName} {author.lastName}</span>
                    <br />
                    <span>
                        biography : {author.biography}, number of books : {author.books != null ? author.books.length : "0"}
                    </span>
                </li>
            ))}
        </ul>
    );
};
