import React, { FC } from "react";

type Props = {
    children: React.ReactNode; //inside of modal
    show: boolean; //indicates if modal shown or not
    hide: () => void; //hides the modal
};

//Base for all modal
const Modal: FC<Props> = ({ show, children, hide }) => {

    return (
        <div>
            {/* if modal must be shown */}
            {show && (
                // background
                <div
                    onClick={() => hide()}
                    className="z-1 absolute top-0 left-0 w-full h-full bg-stone-900 bg-opacity-50"
                >
                    <div
                        className="z-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 left-50 w-50 h-50 bg-stone-500 p-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
