import "./Books.css";
import Book from "../Book/Book";
import Loader from "../Loader/Loader";
import Preloader from "../Preloader/Preloader";
import ErrorPopup from "../ErrorPopup/ErrorPopup";

import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { fetchBooks, loadMoreBooks } from "./booksSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { observeListItems } from "../../utils/utils";

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
  const dispatch = useAppDispatch();
  const booksListRef = useRef<HTMLUListElement>(null);
  // ErrorPopup states
  const [isErrorPopup, setIsErrorPopup] = useState(false);
  // Redux states: books
  const books = useAppSelector((state) => state.books.data).items;
  const booksStatus = useAppSelector((state) => state.books.status);
  const booksTotal = useAppSelector((state) => state.books.data).totalItems;
  const booksError = useAppSelector((state) => state.books.error);

  // Загрузить новые 30 книг по предыдущему запросу
  function handleLoadMore() {
    dispatch(loadMoreBooks(previousQuery));
  }

  // Запрос к API при первоначальной загрузке страницы
  useEffect(() => {
    if (booksStatus === "idle") {
      dispatch(fetchBooks({ ...formValue, searchText: "How to get hired" }));
    }
    if (booksStatus === "failed") {
      setIsErrorPopup(true);
    }
  }, [booksStatus, dispatch, formValue]);

  // Анимация появления книг при прокрутке
  // Intersection Observer
  useEffect(() => {
    const listItems = booksListRef?.current?.querySelectorAll(".books__item");
    listItems && observeListItems(listItems);
  }, [books]);

  return (
    <section className="books">
      <p className="books__counter">
        {booksTotal > 0 ? `Найдено ${booksTotal}` : "Ничего не найдено"}
      </p>
      <ul className="books__list" ref={booksListRef}>
        {books.map((book: any, index: number) => (
          <li className="books__item" key={index}>
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
      <ErrorPopup
        isActive={isErrorPopup}
        setIsActive={setIsErrorPopup}
        errorMessage={booksError?.message || null}
      />
    </section>
  );
}

export default Books;
