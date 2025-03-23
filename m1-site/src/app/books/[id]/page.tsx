'use client'
import { useParams } from "next/navigation";
import GlobalLayout from "../../../components/GlobalLayout";
import { BookDetails } from "../../../components/BookDetail";

//Page for a book details
export default function BooksPageId() {
    return (
      <GlobalLayout>
        <BookDetails></BookDetails>
      </GlobalLayout>
    );
  }