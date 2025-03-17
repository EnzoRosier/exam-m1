"use client";
import { Button } from "./Button";
import "./GlobalLayout.css";

export default function GlobalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Button
                onClick={function (): void {
                    throw new Error("Function not implemented.");
                }}
            >
                Home Page
            </Button>
            <Button
                onClick={function (): void {
                    throw new Error("Function not implemented.");
                }}
            >
                Book List
            </Button>
            <Button
                onClick={function (): void {
                    throw new Error("Function not implemented.");
                }}
            >
                Author List
            </Button>
            <main>{children}</main>
        </div>
    );
}
