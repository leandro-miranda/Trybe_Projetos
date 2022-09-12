export const foodAPI = async (placeholder) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${placeholder}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const drinkAPI = async (placeholder) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${placeholder}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const foodByCategory = async (placeholder) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${placeholder}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const drinkByCategory = async (placeholder) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${placeholder}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
