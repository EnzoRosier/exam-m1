import { FC, useState } from "react";
import { Button } from "./Button";

type Props = {
    sort: string;
    sortTypes: string[];
    setSort: (sort: string) => void;
};

export const Sorter: FC<Props> = ({ sort, setSort, sortTypes }) => {
    const [currSort, setCurrSort] = useState(sort);

    const nextSort = () => {
        const index = sortTypes.indexOf(currSort);
        setCurrSort(sortTypes[(index + 1) % sortTypes.length]);
        setSort(currSort);
    };

    return <Button onClick={() => nextSort()} color="bg-blue-400" colorHover="bg-blue-600">Sorting : {sort}</Button>;
};
