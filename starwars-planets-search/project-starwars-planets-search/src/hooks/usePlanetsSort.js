import { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const NUMBER_NEGATIVE = -1;

function usePlanetsSort(planets) {
  const { sortOrder, sortedByNumber } = useContext(StarWarsContext);
  const { order } = sortOrder;
  const { sort } = sortOrder;
  const checked = planets.length > 0;

  let sortPlanets = planets;
  if (checked && !sortedByNumber) {
    sortPlanets = planets.sort((a, b) => (
      a[sort] > b[sort] ? 1 : NUMBER_NEGATIVE
    ));
  }

  if (checked && sortedByNumber && order === 'ASC') {
    const planetsUnknown = sortPlanets
      .filter((planet) => planet[sort] !== 'unknown')
      .sort((a, b) => (
        Number(a[sort]) - Number(b[sort])
      ));
    const planetUnknown = planets.filter((planet) => planet[sort] === 'unknown');
    sortPlanets = [...planetsUnknown, ...planetUnknown];
  }

  if (checked && sortedByNumber && order === 'DES') {
    const planetsUnknown = sortPlanets
      .filter((planet) => planet[sort] !== 'unknown')
      .sort((a, b) => (
        Number(b[sort]) - Number(a[sort])
      ));
    const planetUnknown = planets.filter((planet) => planet[sort] === 'unknown');
    sortPlanets = [...planetsUnknown, ...planetUnknown];
  }
  return sortPlanets;
}

export default usePlanetsSort;
