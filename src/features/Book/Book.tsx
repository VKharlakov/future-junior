import "./Book.css";
import { Link } from "react-router-dom";

interface BookProps {
  book: Record<string, any>;
  type: string;
}

function Book({ book, type }: BookProps) {
  return (
    <Link className={`book book_type_${type}`} to={book.id} target="_blank">
      <h2 className="book__title">{book.volumeInfo?.title}</h2>
      <img
        className="book__pic"
        alt="Обложка книги"
        src={
          book.volumeInfo?.imageLinks?.thumbnail ||
          `https://placehold.co/${
            type === "profile" ? "200x300" : "150"
          }?text=Обложка+отсутствует`
        }
      />
      <p className="book__category">
        {book.volumeInfo?.categories?.[0]
          .split(/[/,&]/)
          .map((category: string) => category.trim())[0] || "Без категории"}
      </p>
      <ul className="book_authors-list">
        {book.volumeInfo?.authors.map((author: string, index: number) => (
          <li className="book_author" key={index}>
            {author}
          </li>
        ))}
      </ul>
    </Link>
  );
}

export default Book;
