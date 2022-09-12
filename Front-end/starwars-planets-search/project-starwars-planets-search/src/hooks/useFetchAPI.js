import { useEffect, useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function useFetchApi() {
  const { setPlanets, setLoading, setError } = useContext(StarWarsContext);

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((response) => response.json())
        .then(
          (dataAPI) => {
            setPlanets(dataAPI.results);
            setLoading(false);
          },
          (error) => {
            setError(error);
            setLoading(false);
          },
        );
    };
    fetchData();
  }, [setPlanets, setLoading, setError]);
}

export default useFetchApi;
