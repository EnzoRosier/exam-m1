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

const AuthorPage = () => {
    const [authors, setAuthors] = useState<AuthorModel[]>([]);
    const [filteredAuthor, setFilteredAuthor] = useState<AuthorModel[]>([]);
    const [search, setSearch] = useState("");
    const sortTypes = ["asc", "desc"];
    const [sort, setSort] = useState("asc");

    const onCreate = (input: CreateAuthorModel) => {
        axios
            .post("http://localhost:3001/authors", input)
            .then((result) => {
                fetchAuthors();
                console.log("AAA", result.data);
            })
            .catch((err) => console.error(err));
    };

    const fetchAuthors = () => {
        axios
            .get("http://localhost:3001/authors")
            .then((result) => setAuthors(result.data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchAuthors();
    }, []);

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

    const sortListAuthor = (sort: string) => {
        setSort(sort);
        if (sort === "asc") {
            setAuthors(
                [...authors].sort((a, b) =>
                    (a.firstName + a.lastName).localeCompare(
                        b.firstName + b.lastName
                    )
                )
            );
            setFilteredAuthor(
                [...filteredAuthor].sort((a, b) =>
                    (a.firstName + a.lastName).localeCompare(
                        b.firstName + b.lastName
                    )
                )
            );
        } else {
            setAuthors(
                [...authors].sort((a, b) =>
                    (b.firstName + b.lastName).localeCompare(
                        a.firstName + a.lastName
                    )
                )
            );
            setFilteredAuthor(
                [...filteredAuthor].sort((a, b) =>
                    (b.firstName + b.lastName).localeCompare(
                        a.firstName + a.lastName
                    )
                )
            );
        }
    };

    return (
        <GlobalLayout>
            <Breadcrumbs tree={[]} curr={"Author list page"} />
            <div className="grid grid-cols-2">
                <Title>List of Authors :</Title>
                <CreateAuthorModal onCreate={onCreate}></CreateAuthorModal>
            </div>
            <br />
            <br />
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
            <AuthorList
                authorList={search === "" ? authors : filteredAuthor}
            ></AuthorList>
        </GlobalLayout>
    );
};

export default AuthorPage;
