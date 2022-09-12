import React, { useContext, useEffect, useState } from 'react';
import context from '../context/Context';

export default function DrinksCategories() {
  const [categoryName, setCategoryName] = useState([]);
  const { recipesChange, allButton, setResetFilter, resetFilter } = useContext(context);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setCategoryName(data.drinks.filter((_, i) => i <= +'4'));
    };
    fetchCategory();
  }, []);

  const fetchButtons = async (param) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${param}`);
    const data = await response.json();
    if (resetFilter) {
      recipesChange(allButton);
      setResetFilter(false);
    } else {
      recipesChange(data);
      setResetFilter(true);
    }
  };

  return (
    <div className="filter-container">
      {categoryName && categoryName.map((category, index) => (
        <button
          type="button"
          name={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          key={ index }
          onClick={ ({ target }) => fetchButtons(target.name) }
        >
          {category.strCategory}
        </button>
      ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => recipesChange(allButton) }
      >
        All
      </button>
    </div>
  );
}
