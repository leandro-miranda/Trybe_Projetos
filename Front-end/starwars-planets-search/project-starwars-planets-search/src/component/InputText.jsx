import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function InputText() {
  const [text, setText] = useState('');
  const { setFilterName, setFilters } = useContext(StarWarsContext);

  const handleChange = ({ target }) => {
    setText(target.value);
  };

  useEffect(() => {
    setFilterName(text);
    setFilters((state) => ({
      ...state,
      filterByName: {
        name: text,
      },
    }));
  }, [text, setFilterName, setFilters]);

  return (
    <input
      type="text"
      data-testid="name-filter"
      value={ text }
      placeholder="digite um nome"
      onChange={ handleChange }
    />
  );
}

export default InputText;
