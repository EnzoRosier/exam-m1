import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Book {
    id: number;
    title: string;
    author: {
        firstName: string;
        lastName: string;
    };
}

interface ListBookContextProps {
    books: Book[];
    addBook: (book: Book) => void;
    removeBook: (id: number) => void;
}

const ListBookContext = createContext<ListBookContextProps | undefined>(undefined);

export const ListBookProvider = ({ children }: { children: ReactNode }) => {
    const [books, setBooks] = useState<Book[]>([]);

    const addBook = (book: Book) => {
        setBooks((prevBooks) => [...prevBooks, book]);
    };

    const removeBook = (id: number) => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    };

    return (
        <ListBookContext.Provider value={{ books, addBook, removeBook }}>
            {children}
        </ListBookContext.Provider>
    );
};

export const useListBook = () => {
    const context = useContext(ListBookContext);
    if (context === undefined) {
        throw new Error('useListBook must be used within a ListBookProvider');
    }
    return context;
}