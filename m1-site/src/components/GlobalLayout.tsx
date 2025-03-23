"use client";
import { NavButton } from "./NavButton";
import "./GlobalLayout.css";
import { useRouter } from "next/navigation";

//Gloabl layout for all the website
export default function GlobalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const goHomePage = () => {
        router.push("/");
    };

    const goBookPage = () => {
        router.push("/book");
    };

    const goAuthorPage = () => {
        router.push("/author");
    };

    return (
        <div className="grid grid-cols-6 bg-stone-500 text-white">
            {/* Navigation bat */}
            <div className="sticky top-0 col-span-1 flex flex-col bg-stone-900 h-screen">
                <NavButton onClick={goHomePage}>Home Page</NavButton>
                <NavButton onClick={goBookPage}>Book List</NavButton>
                <NavButton onClick={goAuthorPage}>Author List</NavButton>
            </div>
            {/* Main interface */}
            <div className="col-span-5 p-5">
                <main>{children}</main>
            </div>
        </div>
    );
}
