import { FC, useState } from "react";
import { Button } from "./Button";

type Props = {
    sort: string; //Current sort method
    sortTypes: string[]; //All sort methods
    setSort: (sort: string) => void; //Change sort method
};

//Show a button link to sorts type
export const Sorter: FC<Props> = ({ sort, setSort, sortTypes }) => {
    const [currSort, setCurrSort] = useState(sort);

    const nextSort = () => {
        const index = sortTypes.indexOf(currSort);
        setCurrSort(sortTypes[(index + 1) % sortTypes.length]);
        setSort(currSort);
    };

    return <Button onClick={() => nextSort()} color="bg-blue-400" colorHover="bg-blue-600">Sorting : {sort}</Button>;
};
