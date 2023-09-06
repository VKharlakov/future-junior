import Book from "../Book/Book";
import "./Books.css";

interface BooksProps {
  books: Record<string, any>[];
}

function Books({ books }: BooksProps) {
  return (
    <section className="books">
      <p className="books__counter">Найдено {books.length}</p>
      <ul className="books__list">
        {books.length > 0 &&
          books.map((book) => <Book key={book.id} book={book} />)}
      </ul>
    </section>
  );
}

export default Books;
