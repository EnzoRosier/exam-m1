"use client";

import axios from "axios";
import GlobalLayout from "../../../src/components/GlobalLayout";
import { BookList } from "../../components/BookList";
import CreateBookModal from "../../components/modales/CreateBookModal";
import { Title } from "../../components/Title";
import { BookModel, CreateBookModel } from "../../models/BookModel";
import { useEffect, useState } from "react";
import { AuthorModel, CreateAuthorModel } from "../../models/AuthorModel";
import CreateAuthorModal from "../../components/modales/CreateAuthorModal";
import { AuthorList } from "../../components/AuthorList";
import { SearchBar } from "../../components/SearchBar";
import { Sorter } from "../../components/Sorter";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { Button } from "../../components/Button";

//Page with author list
const AuthorPage = () => {
    const [authors, setAuthors] = useState<AuthorModel[]>([]);
    const [filteredAuthor, setFilteredAuthor] = useState<AuthorModel[]>([]);
    const [search, setSearch] = useState("");
    const sortTypes = ["asc", "desc"];
    const [sort, setSort] = useState("asc");
    const [showModal, setShowModal] = useState(false);

    //request to add an author
    const onCreate = (input: CreateAuthorModel) => {
        axios
            .post("http://localhost:3001/authors", input)
            .then((result) => {
                fetchAuthors();
                console.log("AAA", result.data);
            })
            .catch((err) => console.error(err));
    };

    //request to get all authors
    const fetchAuthors = () => {
        axios
            .get("http://localhost:3001/authors")
            .then((result) => setAuthors(result.data))
            .catch((err) => console.error(err));
    };

    //fetch autor at load
    useEffect(() => {
        fetchAuthors();
    }, []);

    //Filter author based on search string
    const filterAuthor = (authors: AuthorModel[], search: string) => {
        setSearch(search);
        setFilteredAuthor(
            authors.filter((a) => {
                console.log(
                    a.firstName.toLowerCase() + " " + a.lastName.toLowerCase
                );
                return (
                    a.firstName.toLowerCase() +
                    " " +
                    a.lastName.toLowerCase()
                ).includes(search.toLowerCase());
            })
        );
    };

    //Sort list of shown auhtor
    const sortListAuthor = (sort: string) => {
        setSort(sort);
        if (sort === "asc") {
            setAuthors(
                [...authors].sort((a, b) =>
                    (a.firstName + a.lastName).localeCompare(
                        b.firstName + b.lastName
                    )
                )
            ); //sort unfiltered
            setFilteredAuthor(
                [...filteredAuthor].sort((a, b) =>
                    (a.firstName + a.lastName).localeCompare(
                        b.firstName + b.lastName
                    )
                )
            ); //sort filtered
        } else {
            setAuthors(
                [...authors].sort((a, b) =>
                    (b.firstName + b.lastName).localeCompare(
                        a.firstName + a.lastName
                    )
                )
            ); //sort unfiltered
            setFilteredAuthor(
                [...filteredAuthor].sort((a, b) =>
                    (b.firstName + b.lastName).localeCompare(
                        a.firstName + a.lastName
                    )
                )
            ); //sort filtered
        }
    };

    return (
        <GlobalLayout>
            <Breadcrumbs tree={[]} curr={"Author list page"} />
            <div className="grid grid-cols-2">
                <Title>List of Authors :</Title>
                <Button
                    color="bg-green-500"
                    colorHover="bg-green-700"
                    onClick={() => setShowModal(true)}
                >
                    Add author
                </Button>
            </div>
            <br />
            <br />
            <div className="grid grid-cols-2 w-1/2 space-x-2 mb-2">
                <SearchBar
                    onSearch={(s) => filterAuthor(authors, s)}
                    search={search}
                >
                    Search authors
                </SearchBar>
                <Sorter
                    sort={sort}
                    sortTypes={sortTypes}
                    setSort={(s) => sortListAuthor(s)}
                ></Sorter>
            </div>
            <AuthorList
                authorList={search === "" ? authors : filteredAuthor}
            ></AuthorList>
            <CreateAuthorModal
                onSubmit={(e) => onCreate(e)}
                hide={() => setShowModal(false)}
                show={showModal}
            ></CreateAuthorModal>
        </GlobalLayout>
    );
};

export default AuthorPage;
