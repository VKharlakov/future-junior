import "./Books.css";
import Book from "../Book/Book";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useEffect } from "react";
import { API_KEY, fetchBooks } from "./booksSlice";

function Books() {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.data);
  const booksStatus = useAppSelector((state) => state.books.status);
  const error = useAppSelector((state) => state.books.error);

  useEffect(() => {
    console.log("useEffect fired");
    console.log(booksStatus);
    if (booksStatus === "idle") {
      console.log("books status is idle, dispatching...");
      dispatch(fetchBooks(`?q=${"lord of the rings"}&key=${API_KEY}`));
    }
  }, [booksStatus, dispatch]);

  useEffect(() => {
    console.log(books);
  }, [books]);

  return (
    <section className="books">
      <p className="books__counter">
        Найдено {Array.isArray(books) && (books.length || 0)}
      </p>
      <ul className="books__list">
        {Array.isArray(books) &&
          books.map((book: any) => <Book book={book} key={book.id} />)}
      </ul>
    </section>
  );
}

export default Books;
