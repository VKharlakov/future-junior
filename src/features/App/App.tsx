import "./App.css";
import Books from "../Books/Books";
import Searchbar from "../Searchbar/Searchbar";
import BookProfile from "../BookProfile/BookProfile";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

function App() {
  return (
    <div className="app">
      <Searchbar />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path={`:bookId`} element={<BookProfile />} />
      </Routes>
    </div>
  );
}

export default App;
