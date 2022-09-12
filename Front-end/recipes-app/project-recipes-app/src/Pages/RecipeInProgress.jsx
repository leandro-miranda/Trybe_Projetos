import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeInProgress() {
  const {
    setFilterId,
    filterId,
    setDrinkOrFood,
    foods,
    favoriteRecipe,
    setApp,
    favorite,
    ingredients,
    verifyChecks,
    verifyImg,
    checkImg,
    checksArray,
    finishRecipes,
  } = useContext(context);
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const url = window.location.href.substr(+'22', +'6');
  const link = window.location.href;
  const linkRedefined = link.slice(0, link.length - +'12');
  setDrinkOrFood(url);
  const date = new Date();
  // https://www.w3schools.com/js/js_string_methods.asp
  const day = String(date.getDate()).padStart(2, '0');
  const mounth = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const currentDate = `${day}/${mounth}/${year}`;
  const [current, setCurrent] = useState({});

  useEffect(() => {
    const fetchProgress = async () => {
      if (url === 'drinks') {
        const respApi = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        const json = await respApi.json();
        setCurrent(
          {
            id: json.drinks[0].idDrink,
            type: 'drink',
            nationality: '',
            category: json.drinks[0].strCategory,
            alcoholicOrNot: json.drinks[0].strAlcoholic,
            name: json.drinks[0].strDrink,
            image: json.drinks[0].strDrinkThumb,
            doneDate: currentDate,
            tags: [],
          },
        );
        setFilterId(json.drinks);
      } else {
        const respApi = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        const json = await respApi.json();
        setCurrent(
          {
            id: json.meals[0].idMeal,
            type: 'food',
            nationality: json.meals[0].strArea,
            category: json.meals[0].strCategory,
            alcoholicOrNot: '',
            name: json.meals[0].strMeal,
            image: json.meals[0].strMealThumb,
            doneDate: currentDate,
            tags: [json.meals[0].strTags.split(',')],
          },
        );
        setFilterId(json.meals);
      }
    };
    fetchProgress();
    setApp(id);
  }, []);

  const copyUrl = () => {
    copy(linkRedefined);
    setCopied(!copied);
  };

  const storageChecks = JSON.parse(localStorage.getItem('checks'));
  return (
    filterId.length && (
      <div>
        {verifyImg(url)}
        <img
          src={ checkImg }
          alt="imagem da receita"
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{favorite.name}</h1>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => copyUrl() }
          >
            <img src={ shareIcon } alt="icone de perfil" />
          </button>
          {copied && <span>Link copied!</span>}
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ () => favoriteRecipe() }
            src={ foods ? blackHeartIcon : whiteHeartIcon }
          >
            <img
              src={ foods ? blackHeartIcon : whiteHeartIcon }
              alt="icone de perfil"
            />
          </button>
        </div>
        <h3 data-testid="recipe-category">{favorite.category}</h3>
        <ul>
          {ingredients
            .filter((item) => item !== '' && item !== null)
            .map((e, i) => (
              <div key={ i } data-testid={ `${i}-ingredient-step` }>
                <input
                  type="checkbox"
                  name={ e }
                  index={ i }
                  onChange={ ({ target: { name: nome } }) => verifyChecks(nome) }
                  checked={
                    storageChecks && storageChecks.includes(e) ? 'cut' : null
                  }
                />
                <li
                  className={
                    storageChecks && storageChecks.includes(e) ? 'cut list' : 'list'
                  }
                >
                  {e}
                </li>
              </div>
            ))}
        </ul>
        <div>
          <h4 data-testid="instructions">{filterId[0].strInstructions}</h4>
        </div>
        <Link to="/done-recipes">
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ !checksArray }
            onClick={ () => finishRecipes(current) }
          >
            Finish
          </button>
        </Link>
      </div>
    )
  );
}

export default RecipeInProgress;
