import { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function usePlanetsFilter() {
  const { planets, filters } = useContext(StarWarsContext);

  const filterName = filters.filterByName.name;
  const filterNumbers = filters.filterByNumber;
  let planetsFilter = planets;

  if (filterName !== '') {
    planetsFilter = planets.filter(
      (planet) => planet.name.toLowerCase()
        .includes(filters.filterByName.name.toLowerCase()),
    );
  }
  if (filterNumbers.length > 0) {
    filterNumbers.forEach((number) => {
      if (number.comparison === 'maior que') {
        planetsFilter = planetsFilter.filter(
          (planet) => Number(planet[number.column]) > number.number
          && planet[number.column] !== 'unknown',
        );
      } else if (number.comparison === 'menor que') {
        planetsFilter = planetsFilter.filter(
          (planet) => Number(planet[number.column]) < number.number
          && planet[number.column] !== 'unknown',
        );
      } else if (number.comparison === 'igual a') {
        planetsFilter = planetsFilter.filter(
          (planet) => planet[number.column] === number.number,
        );
      }
    });
  }
  return planetsFilter;
}

export default usePlanetsFilter;
