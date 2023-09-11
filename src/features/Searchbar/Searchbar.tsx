import "./Searchbar.css";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../Books/booksSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface SearchbarProps {
  setFormValue: React.Dispatch<React.SetStateAction<FormValue>>;
  formValue: FormValue;
  handleSubmit: (event: React.FormEvent) => void;
  previousQuery: FormValue;
}

interface FormValue {
  searchText: string;
  category: string;
  sortBy: string;
}

function Searchbar({
  formValue,
  setFormValue,
  handleSubmit,
  previousQuery,
}: SearchbarProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const booksStatus = useAppSelector((state) => state.books.status);
  const bookProfileStatus = useAppSelector((state) => state.bookProfile.status);

  // Функция при наборе текста
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  }

  // Функция при выборе новой категории/сортировки
  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
    navigate("/");
  }

  // Запрос к API с учетом выбранной категории/сортировки
  useEffect(() => {
    dispatch(
      fetchBooks({ ...formValue, searchText: previousQuery.searchText })
    );
  }, [formValue.category, formValue.sortBy]);

  return (
    <section className="searchbar">
      <form className="searchbar__form" onSubmit={handleSubmit}>
        <input
          className="searchbar__input searchbar__input_type_text"
          type="text"
          placeholder="Начните вводить ключевое слово"
          name="searchText"
          value={formValue.searchText || ""}
          onChange={handleInputChange}
          required
        />
        <button
          className="searchbar__button"
          type="submit"
          disabled={
            booksStatus === "loading" || bookProfileStatus === "loading"
          }
        />
        <label className="searchbar__label">
          Категория
          <select
            className="searchbar__input searchbar__input_type_select"
            defaultValue={"all"}
            name="category"
            onChange={handleSelectChange}
          >
            <option className="searchbar__option" value={"all"}>
              все
            </option>
            <option className="searchbar__option" value={"art"}>
              искусство
            </option>
            <option className="searchbar__option" value={"biography"}>
              биографии
            </option>
            <option className="searchbar__option" value={"computers"}>
              компьютеры
            </option>
            <option className="searchbar__option" value={"history"}>
              исторические
            </option>
            <option className="searchbar__option" value={"medical"}>
              медицина
            </option>
            <option className="searchbar__option" value={"poetry"}>
              поэзия
            </option>
          </select>
        </label>
        <label className="searchbar__label">
          Сортировать по
          <select
            className="searchbar__input searchbar__input_type_select"
            defaultValue={"relevance"}
            name="sortBy"
            onChange={handleSelectChange}
          >
            <option className="searchbar__option" value={"relevance"}>
              соответствию
            </option>
            <option className="searchbar__option" value={"newest"}>
              новизне
            </option>
          </select>
        </label>
      </form>
    </section>
  );
}

export default Searchbar;
