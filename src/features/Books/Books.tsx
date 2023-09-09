import "./Books.css";
import Book from "../Book/Book";
import Loader from "../Loader/Loader";
import Preloader from "../Preloader/Preloader";

import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { fetchBooks, loadMoreBooks } from "./booksSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

interface BooksProps {
  formValue: FormValue;
  previousQuery: FormValue;
}

interface FormValue {
  searchText: string;
  category: string;
  sortBy: string;
}

function Books({ formValue, previousQuery }: BooksProps) {
  //
  const [isIntersecting, setIsIntersecting] = useState(false);
  const listItemRef = useRef<HTMLLIElement[]>([]);
  console.log(listItemRef);
  //
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.data).items;
  const booksTotal = useAppSelector((state) => state.books.data).totalItems;
  const booksStatus = useAppSelector((state) => state.books.status);
  const error = useAppSelector((state) => state.books.error);

  function handleLoadMore() {
    dispatch(loadMoreBooks(previousQuery));
  }

  // Запрос к API при первоначальной загрузке страницы
  useEffect(() => {
    if (booksStatus === "idle") {
      dispatch(fetchBooks({ ...formValue, searchText: "How to get hired" }));
    }
  }, [booksStatus, dispatch, formValue]);

  return (
    <section className="books">
      <p className="books__counter">
        {booksTotal > 0 ? `Найдено ${booksTotal}` : "Ничего не найдено"}
      </p>
      <ul className="books__list">
        {books.map((book: any, index: number) => (
          <li
            className="books__item"
            key={index}
            ref={(element) => {
              if (element) {
                listItemRef.current[index] = element;
              }
            }}
          >
            <Link className="books__link" to={book.id} target="_blank">
              <Book book={book} type={"list-item"} />
            </Link>
          </li>
        ))}
      </ul>
      {booksTotal > 0 && books.length < booksTotal && (
        <button
          className="books__load-more-button"
          disabled={booksStatus === "loading"}
          onClick={handleLoadMore}
        >
          {booksStatus === "loading" ? <Loader /> : "Еще"}
        </button>
      )}
      <Preloader isActive={booksStatus === "loading"} />
    </section>
  );
}

export default Books;
