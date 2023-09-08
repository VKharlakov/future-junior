import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./BookProfile.css";
import { useParams } from "react-router-dom";
import Book from "../Book/Book";
import { API_KEY } from "../../utils/constants";
import { fetchBookProfile } from "./bookProfileSlice";

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

  return (
    <section className="book-profile">
      <p>Информация о {book.volumeInfo?.title}</p>
      <Book book={book} type={"profile"} />
    </section>
  );
}

export default BookProfile;
