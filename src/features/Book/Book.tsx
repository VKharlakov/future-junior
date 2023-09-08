import "./Book.css";

interface BookProps {
  book: Record<string, any>;
  type: string;
}

function Book({ book, type }: BookProps) {
  return (
    <div className={`book book_type_${type}`}>
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
        {book.volumeInfo?.authors?.map((author: string, index: number) => (
          <li className="book_author" key={index}>
            {author}
          </li>
        )) || <li className="book_author">Автор неизвестен</li>}
      </ul>
    </div>
  );
}

export default Book;
