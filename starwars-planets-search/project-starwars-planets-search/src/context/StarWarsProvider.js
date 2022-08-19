import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterName, setFilterName] = useState('');
  const [filterNumbers, setfilterNumbers] = useState({});
  const [valueColumns, setValueColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumber: [],
  });
  const [sortOrder, setSortOrder] = useState({
    sort: 'name',
    order: 'ASC',
  });
  const [sortedByNumber, setSortedByNumber] = useState(false);

  const starWarsContext = {
    planets,
    setPlanets,
    error,
    setError,
    loading,
    setLoading,
    filterName,
    setFilterName,
    filterNumbers,
    setfilterNumbers,
    filters,
    setFilters,
    valueColumns,
    setValueColumns,
    sortOrder,
    setSortOrder,
    sortedByNumber,
    setSortedByNumber,
  };

  return (
    <StarWarsContext.Provider value={ starWarsContext }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
