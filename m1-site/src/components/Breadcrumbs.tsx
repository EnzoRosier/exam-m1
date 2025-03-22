import { useRouter } from "next/navigation";
import React, { FC } from "react";

type Props = {
    tree: { name: string; link: string }[];
    curr: string;
};

export const Breadcrumbs: FC<Props> = ({ tree, curr }) => {
    const router = useRouter();
    return (
        <p>
            <span className="text-blue-500" onClick={() => router.push("/")}>
                Homepage
            </span>{" "}
            /
            <span>
                {tree.map((a, index) => (
                    <>
                        <span
                            key={index}
                            className="text-blue-500"
                            onClick={() => router.push(a.link)}
                        >
                            {" " + a.name}
                        </span>{" "}
                        {" /"}
                    </>
                ))}
            </span>
            <span>{" " + curr}</span>
        </p>
    );
};
