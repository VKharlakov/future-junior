import "./Books.css";
import Book from "../Book/Book";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useEffect } from "react";
import { fetchBooks } from "./booksSlice";
import { API_KEY } from "../../utils/constants";
import { Link } from "react-router-dom";

function Books() {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.data).items;
  const booksTotal = useAppSelector((state) => state.books.data).totalItems;
  const booksStatus = useAppSelector((state) => state.books.status);
  const error = useAppSelector((state) => state.books.error);

  useEffect(() => {
    console.log("useEffect fired");
    console.log(booksStatus);
    if (booksStatus === "idle") {
      console.log("books status is idle, dispatching...");
      dispatch(fetchBooks(`?q='Typescript'&key=${API_KEY}`));
    }
  }, [booksStatus, dispatch]);

  useEffect(() => {
    console.log(books);
  }, [books]);

  return (
    <section className="books">
      <p className="books__counter">
        {booksTotal > 0 ? `Найдено ${booksTotal}` : "Ничего не найдено"}
      </p>
      <ul className="books__list">
        {books.map((book: any) => (
          <li className="books__item" key={book.id}>
            <Link className="books__link" to={book.id} target="_blank">
              <Book book={book} type={"list-item"} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Books;
