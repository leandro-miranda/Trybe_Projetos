import React, { useContext, useEffect, useState } from 'react';
import context from '../context/Context';

export default function FoodCategories() {
  const [categoryName, setCategoryName] = useState([]);
  const {
    recipesChange, allButton, setResetFilter, resetFilter, setGoat,
  } = useContext(context);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setCategoryName(data.meals.filter((_, i) => i <= +'4'));
    };
    fetchCategory();
  }, []);

  const fetchButtons = async (param) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${param}`);
    const data = await response.json();
    if (param === 'Goat') {
      setGoat(true);
    }
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
          data-testid={ `${category.strCategory}-category-filter` }
          key={ index }
          name={ category.strCategory }
          onClick={ ({ target }) => fetchButtons(target.name) }
        >
          {category.strCategory}
        </button>
      ))}
      <button
        type="button"
        data-testid="All-category-filter"
        value="teste"
        onClick={ () => recipesChange(allButton) }
      >
        All
      </button>
    </div>
  );
}
