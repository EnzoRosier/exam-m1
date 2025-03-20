import React, { FC } from "react"

type Props = {
    children: React.ReactNode,
    color?: string
    colorHover?: string
    onClick: () => void
}

export const Button : FC<Props> = ({ children, onClick, color, colorHover }) => {
    return <button className={`p-2 text-white ${color == null ? "$bg-blue-600" : color} hover:${colorHover == null ? "$bg-blue-700" : colorHover} cursor-pointer rounded`} onClick={onClick}>{children}</button>
}