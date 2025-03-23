import { FC } from "react"
import './GlobalLayout.css';

type Props = {
  children: string
  onClick: () => void
}

//Show a button to navigate in website
export const NavButton: FC<Props> = ({ children, onClick }) => {
  return <span className= "p-4 text-white bg-stone-800 hover:bg-stone-700 w-full cursor-pointer" onClick={onClick}>{children}</span>
}