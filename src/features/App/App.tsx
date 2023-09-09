import "./App.css";
import Books from "../Books/Books";
import Searchbar from "../Searchbar/Searchbar";
import BookProfile from "../BookProfile/BookProfile";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { Route, Routes } from "react-router-dom";
import { fetchBooks } from "../Books/booksSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Переменная значений формы компонента <Searchbar />
  const [formValue, setFormValue] = useState({
    searchText: "",
    category: "all",
    sortBy: "relevance",
  });

  // Сохраненные значения формы предыдущего запроса
  const [previousQuery, setPreviousQuery] = useState({
    ...formValue,
    searchText: "How to get hired",
  });

  // Функция сабмита с запросом к API
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    navigate("/"); //перекинуть на главную страницу

    dispatch(fetchBooks(formValue));
    setPreviousQuery({ ...formValue });
    setFormValue({ ...formValue, searchText: "" });
  }

  return (
    <div className="app">
      <Searchbar
        formValue={formValue}
        setFormValue={setFormValue}
        handleSubmit={handleSubmit}
        previousQuery={previousQuery}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Books formValue={formValue} previousQuery={previousQuery} />
          }
        />
        <Route path={`:bookId`} element={<BookProfile />} />
      </Routes>
    </div>
  );
}

export default App;
