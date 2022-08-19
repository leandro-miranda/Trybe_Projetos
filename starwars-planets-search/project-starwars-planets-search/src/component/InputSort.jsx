import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function InputSort() {
  const [valueColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [sortColumn, setSortColumn] = useState('population');
  const [toSortOrder, setToSortOrder] = useState('ASC');
  const { setSortOrder, setSortedByNumber } = useContext(StarWarsContext);

  const handleColumn = ({ target }) => {
    setSortColumn(target.value);
  };

  const handleSort = ({ target }) => {
    setToSortOrder(target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setSortOrder({
      sort: sortColumn,
      order: toSortOrder,
    });
    setSortedByNumber(true);
  };

  return (
    <div>
      <form onSubmit={ handleClick }>
        <label htmlFor="sort-column">
          <p>Coluna:</p>
          <select
            id="sort-column"
            data-testid="column-sort"
            onChange={ handleColumn }
          >
            {
              valueColumns.map((column) => (
                <option value={ column } key={ column }>
                  {column}
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="asc">
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            id="asc"
            name="sort"
            value="ASC"
            onChange={ handleSort }
            checked={ toSortOrder === 'ASC' }
          />
          Ascendente
        </label>
        <label htmlFor="des">
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            id="des"
            name="sort"
            value="DES"
            onChange={ handleSort }
            checked={ toSortOrder === 'DES' }
          />
          Descendente
        </label>
        <button
          type="submit"
          data-testid="column-sort-button"
        >
          Ordenar
        </button>
      </form>
    </div>
  );
}

export default InputSort;
