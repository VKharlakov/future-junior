import React, { useState } from "react";
import "./Searchbar.css";

function Searchbar() {
  const [formValue, setFormValue] = useState({ searchText: "" });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormValue({ ...formValue, [name]: value });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <section className="searchbar">
      <form className="searchbar__form" onSubmit={handleSubmit}>
        <input
          className="searchbar__input searchbar__input_type_text"
          type="text"
          placeholder="Начните вводить ключевое слово"
          name="searchText"
          value={formValue.searchText || ""}
          onChange={handleChange}
          required
        />
        <button className="searchbar__button" type="submit" />
        <label className="searchbar__label">
          Категории
          <select className="searchbar__input searchbar__input_type_select">
            <option className="searchbar__option">все</option>
            <option className="searchbar__option">искусство</option>
            <option className="searchbar__option">биографии</option>
            <option className="searchbar__option">компьютеры</option>
            <option className="searchbar__option">исторические</option>
            <option className="searchbar__option">медицина</option>
            <option className="searchbar__option">поэзия</option>
          </select>
        </label>
        <label className="searchbar__label">
          Сортировать по
          <select className="searchbar__input searchbar__input_type_select">
            <option className="searchbar__option">соответствию</option>
            <option className="searchbar__option">новизне</option>
          </select>
        </label>
      </form>
    </section>
  );
}

export default Searchbar;
