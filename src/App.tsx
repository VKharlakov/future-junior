import "./App.css";
import Books from "./features/Books/Books";
import Searchbar from "./features/Searchbar/Searchbar";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import BookProfile from "./features/BookProfile/BookProfile";

function App() {
  const [books, setBooks] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    fetch(
      "https://www.googleapis.com/books/v1/volumes?q=intitle:the-hobbit+inauthor:john-ronald-reuel-tolkien+subject:fiction&langRestrict=en&maxResults=30&key=AIzaSyCMgPCBbY5NFrl_sniAn3_snP5tqPaUS8c"
    )
      .then((res) => res.json())
      .then((res) => setBooks(res.items));
  }, []);

  return (
    <div className="app">
      <Searchbar />
      <Routes>
        <Route path="/" element={<Books books={books} />} />
        {books.map((book) => (
          <Route path={`/${book.id}`} key={book.id} element={<BookProfile />} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
