import "./Book.css";
import { Link } from "react-router-dom";

interface BookProps {
  book: Record<string, any>;
}

function Book({ book }: BookProps) {
  return (
    <li className="book">
      <Link className="book__link" to={book.id} target="_blank">
        <h2 className="book__title">{book.volumeInfo.title}</h2>
        <span
          className="book__pic"
          style={{
            backgroundImage: `url(${
              book.volumeInfo.imageLinks?.smallThumbnail || ""
            })`,
          }}
        />
        <p className="book__category">{book.volumeInfo.categories}</p>
        <p className="book_authors">{book.volumeInfo.authors}</p>
      </Link>
    </li>
  );
}

export default Book;
