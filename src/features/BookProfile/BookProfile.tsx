import "./BookProfile.css";
import Book from "../Book/Book";
import Preloader from "../Preloader/Preloader";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBookProfile } from "./bookProfileSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

// Библиотека "DOMPurify" для очистки приходящего от API
// текста в формате HTML
import DOMPurify from "dompurify";

// Библиотека "parse" для форматирования HTML в текст
import parse from "html-react-parser";

function BookProfile() {
  const { bookId } = useParams();
  const dispatch = useAppDispatch();

  const book = useAppSelector((state) => state.bookProfile.data);
  const booksStatus = useAppSelector((state) => state.bookProfile.status);
  const error = useAppSelector((state) => state.bookProfile.error);

  // Форматирование приходящей HTML верстки в текст
  const cleanDescription = parse(
    DOMPurify.sanitize(book.volumeInfo?.description)
  );

  // Запрос к API при первоначальной загрузке страницы
  useEffect(() => {
    if (booksStatus === "idle") {
      if (bookId) {
        dispatch(fetchBookProfile(bookId));
      }
    }
  }, [booksStatus, dispatch, bookId]);

  return (
    <section className="book-profile">
      <h2 className="book-profile__title">{book.volumeInfo?.title}</h2>
      <div className="book-profile__info">
        <p className="book-profile__subtitle">{book.volumeInfo?.subtitle}</p>
        <div className="book-profile__description">{cleanDescription}</div>
        <div className="book-profile__info-brief">
          <p className="book-profile__print-type">
            Тип: {book.volumeInfo?.printType}
          </p>
          <p className="book-profile__language">
            Язык: {book.volumeInfo?.language}
          </p>
          <p className="book-profile__publisher">
            Издатель: {book.volumeInfo?.publisher}
          </p>
          <p className="book-profile__published-date">
            Год издания: {book.volumeInfo?.publishedDate}
          </p>

          <p className="book-profile__page-count">
            Количество страниц: {book.volumeInfo?.pageCount}
          </p>
        </div>
      </div>
      <a
        className="book-profile__book-cover"
        href={book.volumeInfo?.canonicalVolumeLink}
      >
        <Book book={book} type={"profile"} />
      </a>
      <Preloader isActive={booksStatus === "loading"} />
    </section>
  );
}

export default BookProfile;
