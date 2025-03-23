import { useRouter } from "next/navigation";
import React, { FC } from "react";

type Props = {
    tree: { name: string; link: string }[]; //path before
    curr: string; //name of current position
};

//Show the breadcrumbs for navigation
export const Breadcrumbs: FC<Props> = ({ tree, curr }) => {
    const router = useRouter();
    return (
        <p>
            {/* Homepage */}
            <span className="text-blue-700 cursor-pointer" onClick={() => router.push("/")}>
                Homepage
            </span>{" "}
            /
            <span>
                {/* Path */}
                {tree.map((a, index) => (
                    <span key={index}>
                        <span
                            
                            className="text-blue-700 cursor-pointer"
                            onClick={() => router.push(a.link)}
                        >
                            {" " + a.name}
                        </span>{" "}
                        {" /"}
                    </span>
                ))}
            </span>
            {/* Current */}
            <span>{" " + curr}</span>
        </p>
    );
};
