import { FC } from "react";

type Props = {
    onSearch: (search: string) => void;
    search: string;
    children: string;
};

//Show a search bar
export const SearchBar: FC<Props> = ({ onSearch, search, children }) => {
    return (
        <input
            className="text-black mb-2"
            placeholder={children}
            type="text"
            onChange={(e) => onSearch(e.target.value)}
            value={search}
        ></input>
    );
};
