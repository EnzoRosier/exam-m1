import { useState } from "react";

export const ReviewDrawer = () => {
    const [show, setShow] = useState(false);

    return (
        <div>
            <button
                className="bg-stone-800 text-white p-4 rounded-full"
                onClick={() => setShow(!show)}
            >
                Show Reviews
            </button>
            <div
                className={`fixed bottom-0 right-0 left-0 bg-stone-800 text-white p-4 rounded-lg w-screen h-1/2 transform transition-transform duration-300 ${
                    show ? "translate-y-0" : "translate-y-full"
                }`}
            >
                This is a review
            </div>
        </div>
    );
};
