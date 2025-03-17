import { FC } from "react"
import './GlobalLayout.css';

type Props = {
  children: string
}

export const Title: FC<Props> = ({ children }) => {
  return <p className= "text-3xl">{children}</p>
}