'use client'
import { useParams } from "next/navigation";
import GlobalLayout from "../../../components/GlobalLayout";
import { BookDetails } from "../../../components/BookDetail";

export default function BooksPageId() {
    return (
      <GlobalLayout>
        <BookDetails></BookDetails>
      </GlobalLayout>
    );
  }