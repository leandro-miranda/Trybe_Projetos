import React, { useContext } from 'react';
import useFetchApi from '../hooks/useFetchAPI';
import usePlanetsFilter from '../hooks/usePlanetsFilter';
import usePlanetsSort from '../hooks/usePlanetsSort';
import StarWarsContext from '../context/StarWarsContext';
import Table from './Table';
import InputText from './InputText';
import FilterByNumber from './FilterByNumber';
import ApplyingFilters from './ApplyingFilters';
import InputSort from './InputSort';

function StarWars() {
  const { loading, error } = useContext(StarWarsContext);
  useFetchApi();
  const filteredPlanets = usePlanetsFilter();
  const resultOrderPlanets = usePlanetsSort(filteredPlanets);

  if (error) {
    return (
      <p>
        Error:
        {' '}
        {error.message}
      </p>
    );
  }
  return (
    <div>
      <h1>Star Wars Planets</h1>
      <InputText />
      <div>
        <FilterByNumber />
        <InputSort />
      </div>
      <ApplyingFilters />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table planets={ resultOrderPlanets } />
      )}
    </div>
  );
}

export default StarWars;
