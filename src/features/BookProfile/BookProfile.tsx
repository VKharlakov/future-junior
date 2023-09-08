import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./BookProfile.css";
import { useParams } from "react-router-dom";
import { API_KEY, fetchBooks } from "../Books/booksSlice";
import Book from "../Book/Book";

function BookProfile() {
  const { bookId } = useParams();
  const dispatch = useAppDispatch();
  const book = useAppSelector((state) => state.books.data.items);
  const booksStatus = useAppSelector((state) => state.books.status);
  const error = useAppSelector((state) => state.books.error);

  useEffect(() => {
    console.log("BookProfile useEffect firing");
    if (booksStatus === "idle") {
      console.log("dispatching books...");
      dispatch(fetchBooks(`/${bookId}?key=${API_KEY}`));
    }
    console.log("books:", book);
  }, [booksStatus, dispatch, bookId]);

  return (
    <section className="book-profile">
      <p>Информация о {!Array.isArray(book) && book.volumeInfo?.title}</p>
      <Book book={book} type={"profile"} />
    </section>
  );
}

export default BookProfile;
