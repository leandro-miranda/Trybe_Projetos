import { string } from 'prop-types';
import React, { useContext, useState } from 'react';
import context from '../context/Context';
import '../styles/SearchBar.css';

function SearchBar({ nameBtn }) {
  const { setFilterFood, changeSearch, setPageActual } = useContext(context);
  const [type, setType] = useState('');
  const [filter, setFilter] = useState('');

  const handleClick = (btn) => {
    changeSearch(type);
    setFilterFood(filter);
    setPageActual(btn);
  };

  return (
    <div className="search-bar-container">
      <input
        className="search-input"
        type="text"
        data-testid="search-input"
        placeholder="Buscar receita"
        onChange={ ({ target: { value } }) => setType(value) }
      />
      <div className="filters">
        <label htmlFor="ingredient">
          <input
            type="radio"
            name="filter"
            id="ingredient"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onClick={ ({ target: { value } }) => setFilter(value) }
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            name="filter"
            value="name"
            id="name"
            data-testid="name-search-radio"
            onClick={ ({ target: { value } }) => setFilter(value) }
          />
          Nome
        </label>
        <label htmlFor="first">
          <input
            type="radio"
            name="filter"
            id="first"
            value="firstLetter"
            data-testid="first-letter-search-radio"
            onClick={ ({ target: { value } }) => setFilter(value) }
          />
          Primeira Letra
        </label>
      </div>
      <button
        className="button-search"
        type="button"
        data-testid="exec-search-btn"
        name={ nameBtn }
        onClick={ ({ target: { name } }) => handleClick(name) }
      >
        Buscar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  nameBtn: string,
}.isRequired;

export default SearchBar;
