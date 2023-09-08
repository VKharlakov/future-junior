import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./BookProfile.css";
import { useParams } from "react-router-dom";
import Book from "../Book/Book";
import { API_KEY } from "../../utils/constants";
import { fetchBookProfile } from "./bookProfileSlice";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

function BookProfile() {
  const { bookId } = useParams();
  const dispatch = useAppDispatch();
  const book = useAppSelector((state) => state.bookProfile.data);
  const booksStatus = useAppSelector((state) => state.bookProfile.status);
  const error = useAppSelector((state) => state.bookProfile.error);

  useEffect(() => {
    console.log("BookProfile useEffect firing");
    if (booksStatus === "idle") {
      console.log("dispatching books...");
      dispatch(fetchBookProfile(`/${bookId}?key=${API_KEY}`));
    }
    console.log("book:", book);
  }, [booksStatus, dispatch, bookId]);

  const cleanDescription = parse(
    DOMPurify.sanitize(book.volumeInfo?.description)
  );
  console.log(cleanDescription);

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
    </section>
  );
}

export default BookProfile;
