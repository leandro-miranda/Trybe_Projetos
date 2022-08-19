import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function ApplyingFilters() {
  const { filters, setFilters, setValueColumns } = useContext(StarWarsContext);
  const [applyFilters, setApplyFilters] = useState(false);

  useEffect(() => {
    if (filters.filterByNumber.length > 0) {
      setApplyFilters(true);
    } else {
      setApplyFilters(false);
    }
  }, [filters.filterByNumber]);

  const handleFilterRemove = ({ target }) => {
    setFilters({
      ...filters,
      filterByNumber: filters.filterByNumber.filter(
        (filter) => filter.column !== target.value,
      ),
    });
    setValueColumns((state) => [...state, target.value]);
  };

  const handleAllFiltersRemove = () => {
    setFilters((state) => ({
      ...state,
      filterByNumber: [],
    }));
    setValueColumns([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  };

  return (
    <div>
      {applyFilters && (
        <div>
          <p>Filtros Aplicados:</p>
          {filters.filterByNumber.map((filter) => (
            <div key={ filter.column } data-testid="filter">
              {`${filter.column}`}
              {`${filter.comparison}`}
              {`${filter.number}`}
              <button
                type="button"
                value={ filter.column }
                onClick={ handleFilterRemove }
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ handleAllFiltersRemove }
          >
            Remove todos os filtros
          </button>
        </div>
      )}
    </div>
  );
}

export default ApplyingFilters;
