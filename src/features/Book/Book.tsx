import "./Book.css";

interface BookProps {
  book: Record<string, any>;
  type: string;
}

function Book({ book, type }: BookProps) {
  const authorsList = book.volumeInfo?.authors;

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
      {type !== "profile" && (
        <p className="book__category">
          {book.volumeInfo?.categories?.[0]
            .split(/[/,&]/)
            .map((category: string) => category.trim())[0] || "Без категории"}
        </p>
      )}
      <ul className="book_authors-list">
        {!authorsList ? (
          <li className="book_author">Автор неизвестен</li>
        ) : type === "list-item" ? (
          <>
            {authorsList.slice(0, 3).map((author: string, index: number) => (
              <li className="book_author" key={index}>
                {author}
              </li>
            ))}
            {authorsList.length > 3 && (
              <li className="book_author">и еще {authorsList.length - 3}</li>
            )}
          </>
        ) : (
          authorsList.map((author: string, index: number) => (
            <li className="book_author" key={index}>
              {author}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Book;
