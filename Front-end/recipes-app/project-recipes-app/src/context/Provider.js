import { node } from 'prop-types';
import React, { useState, useEffect } from 'react';
import context from './Context';

function Provider({ children }) {
  const [allButton, setAllButton] = useState([]);
  const [goat, setGoat] = useState(false);
  const [resetFilter, setResetFilter] = useState(false);
  const [filterId, setFilterId] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [searched, setSearched] = useState('');
  const changeSearch = (param) => {
    setSearched(param);
  };
  const [filterFood, setFilterFood] = useState('');
  const [pageActual, setPageActual] = useState('');
  const [recipes, setRecipes] = useState([]);
  const recipesChange = (param) => {
    setRecipes(param);
  };
  const errorMessage = 'Sorry, we haven\'t found any recipes for these filters.';
  useEffect(() => {
    const fetchFood = async () => {
      if (filterFood === 'ingredient') {
        const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searched}`);
        const json = await resp.json();
        recipesChange(json);
      } else if (filterFood === 'name') {
        const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searched}`);
        const json = await resp.json();
        recipesChange(json);
      } else if (filterFood === 'firstLetter' && searched.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else if (filterFood === 'firstLetter') {
        const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searched}`);
        const json = await resp.json();
        recipesChange(json);
      }
    };
    if (pageActual === 'food') { fetchFood(); }
  }, [searched, filterFood, pageActual]);
  useEffect(() => {
    const fetchDrink = async () => {
      if (filterFood === 'ingredient') {
        try {
          const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searched}`);
          const json = await resp.json();
          recipesChange(json);
        } catch (e) {
          global.alert(errorMessage);
        }
      } else if (filterFood === 'name') {
        try {
          const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searched}`);
          const json = await resp.json();
          recipesChange(json);
        } catch (e) { global.alert(errorMessage); }
      } else if (filterFood === 'firstLetter' && searched.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else if (filterFood === 'firstLetter') {
        const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searched}`);
        const json = await resp.json();
        recipesChange(json);
      }
    };
    if (pageActual === 'drink') {
      fetchDrink();
    }
  }, [searched, filterFood, pageActual]);
  const [storage, setStorage] = useState([]);
  useEffect(() => {
    setStorage(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);
  const [app, setApp] = useState([]);
  const [foods, setFoods] = useState(false);
  useEffect(() => {
    const verify = storage && storage.some((e) => e.id === app);
    if (storage === null || !verify) {
      setFoods(false);
    } else if (storage !== null && verify) {
      setFoods(true);
    }
  }, [app, storage]);
  const [favorite, setFavorite] = useState({});
  const favoriteRecipe = () => {
    const verify = storage && storage.some((e) => e.id === app);
    if (storage === null && !verify) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favorite]));
      setStorage(JSON.parse(localStorage.getItem('favoriteRecipes')));
    } else if (storage !== null && !verify) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...storage, favorite]));
      setStorage(JSON.parse(localStorage.getItem('favoriteRecipes')));
    } else if (verify) {
      setFoods(false);
      localStorage.setItem('favoriteRecipes',
        JSON.stringify(storage.filter((e) => e.id !== app)));
      setStorage(storage.filter((e) => e.id !== app));
    }
  };
  const [drinkOrFood, setDrinkOrFood] = useState('');
  useEffect(() => {
    if (filterId.length && drinkOrFood === 'drinks') {
      setFavorite({
        id: filterId[0].idDrink,
        type: 'drink',
        category: filterId[0].strCategory,
        alcoholicOrNot: filterId[0].strAlcoholic,
        name: filterId[0].strDrink,
        image: filterId[0].strDrinkThumb,
        nationality: '' });
    } else if (filterId.length && drinkOrFood === 'foods/') {
      setFavorite({
        id: filterId[0].idMeal,
        type: 'food',
        category: filterId[0].strCategory,
        alcoholicOrNot: '',
        name: filterId[0].strMeal,
        image: filterId[0].strMealThumb,
        nationality: filterId[0].strArea });
    }
  }, [filterId, drinkOrFood]);
  const saveRecipesInProgress = (param1, param2) => {
    const ingredientState = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (param1 !== '' && ingredientState) {
      const value = Object.values(param1);
      localStorage.setItem('inProgressRecipes', (
        JSON.stringify({
          cocktails: {
            ...ingredientState.cocktails,
            [id]: value },
          meals: {
            ...ingredientState.meals },
        })));
    } else if (param1 === '' && ingredientState) {
      const value = Object.values(param2);
      localStorage.setItem('inProgressRecipes', (
        JSON.stringify({
          cocktails: {
            ...ingredientState.cocktails },
          meals: {
            ...ingredientState.meals,
            [id]: value },
        })));
    }
  };
  const [checks, setChecks] = useState([]);
  const verifyChecks = (nome) => {
    const arrChecks = JSON.parse(localStorage.getItem('checks'));
    if (checks && checks.includes(nome)) {
      setChecks(checks.filter((element) => element !== nome));
      localStorage.setItem('checks',
        JSON.stringify(checks.filter((element) => element !== nome)));
    } else if (!checks.includes(nome) && !arrChecks) {
      setChecks(!checks.length ? [nome] : [...checks, nome]);
      localStorage.setItem('checks', JSON.stringify([nome]));
    } else if (arrChecks) {
      localStorage.setItem('checks', JSON.stringify([...arrChecks, nome]));
      setChecks(!checks.length ? [nome] : [...checks, nome]);
    }
  };
  const ingredients = filterId.length && Object.entries(filterId[0])
    .reduce((acc, e) => {
      if (e[0].includes('strIngredient')) {
        acc.push(e[1]);
      }
      return acc;
    }, []);
  const [imgCheck, setImgCheck] = useState('');
  const verifyImg = (url) => {
    if (url === 'drinks') {
      setImgCheck(filterId[0].strDrinkThumb);
    } else { setImgCheck(filterId[0].strMealThumb); }
  };
  const documentQuery = document.querySelectorAll('.app-recipes');
  const checksArray = documentQuery && [...documentQuery]
    .every((e) => e.checked === true);
  const recipesFinish = (param) => {
    const arrRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (arrRecipes) {
      localStorage.setItem('doneRecipes',
        JSON.stringify([...arrRecipes, param]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([param]));
    }
  };
  const contextValue = {
    goat,
    setGoat,
    searched,
    changeSearch,
    setFilterFood,
    filterFood,
    recipes,
    setPageActual,
    pageActual,
    recipesChange,
    allButton,
    setAllButton,
    resetFilter,
    setResetFilter,
    filterId,
    setFilterId,
    recomendations,
    setRecomendations,
    setStorage,
    storage,
    setApp,
    foods,
    setFoods,
    favoriteRecipe,
    setFavorite,
    favorite,
    setDrinkOrFood,
    saveRecipesInProgress,
    verifyChecks,
    checks,
    ingredients,
    verifyImg,
    checksArray,
    recipesFinish,
    imgCheck,
    setImgCheck };

  return (
    <context.Provider value={ contextValue }>
      {children}
    </context.Provider>
  );
}
Provider.propTypes = { children: node }.isRequired;

export default Provider;
