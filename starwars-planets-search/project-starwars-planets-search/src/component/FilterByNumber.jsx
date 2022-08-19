import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FilterByNumber() {
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [numberInputFilter, setNumberInputFilter] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [messageBtn, setMessageBtn] = useState('Adicionar filtro');
  const { setFilters, valueColumns, filters } = useContext(StarWarsContext);

  const handleColumn = ({ target }) => {
    setFilterColumn(target.value);
  };

  const handleComparison = ({ target }) => {
    setFilterComparison(target.value);
  };

  const handleNumberInput = ({ target }) => {
    setNumberInputFilter(target.value);
  };

  const handleFilterNumbers = (event) => {
    event.preventDefault();
    setFilters((state) => ({
      ...state,
      filterByNumber: [
        ...state.filterByNumber,
        {
          column: filterColumn,
          comparison: filterComparison,
          number: numberInputFilter,
        },
      ],
    }));
    valueColumns.splice(valueColumns.indexOf(filterColumn), 1);
    setNumberInputFilter(0);
    setFilterColumn(valueColumns[0]);
  };

  useEffect(() => {
    const filterNumber = filters.filterByNumber.length;
    const numberTree = 3;

    if (filterNumber === numberTree) {
      setBtnDisabled(true);
      setMessageBtn('Limite de filtros excedido');
    }
  }, [filters.filterByNumber]);

  return (
    <div>
      <form onSubmit={ handleFilterNumbers }>
        <label htmlFor="filter-column">
          <strong>Coluna:</strong>
          <select
            id="filter-column"
            data-testid="column-filter"
            onChange={ handleColumn }
          >
            {
              valueColumns.map((column) => (
                <option key={ column } value={ column }>
                  {column}
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="comparison">
          <strong>Operador:</strong>
          <select
            id="comparison"
            data-testid="comparison-filter"
            onChange={ handleComparison }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          type="number"
          data-testid="value-filter"
          placeholder="Valor"
          value={ numberInputFilter }
          onChange={ handleNumberInput }
        />
        <button
          type="submit"
          data-testid="button-filter"
          disabled={ btnDisabled }
          title={ messageBtn }
        >
          Filtrar
        </button>
      </form>
    </div>
  );
}

export default FilterByNumber;
