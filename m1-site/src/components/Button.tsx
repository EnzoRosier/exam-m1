import { FC } from "react"
import './GlobalLayout.css';

type Props = {
  children: string
  onClick: () => void
}

export const Button: FC<Props> = ({ children, onClick }) => {
  return <span className= "m-6 bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-700" onClick={onClick}>{children}</span>
}