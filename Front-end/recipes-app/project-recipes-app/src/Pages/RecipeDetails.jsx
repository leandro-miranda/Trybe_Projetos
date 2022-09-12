import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/Details.css';

const copy = require('clipboard-copy');

function RecipeDetailsFood() {
  const { setFilterId, filterId, setRecomendations,
    recomendations, setFavorite, saveRecipesInProgress,
    foods, favoriteRecipe, setApp } = useContext(context);

  const { id } = useParams();
  const hrefUrl = window.location.href;
  const [copying, setCopying] = useState(false);

  useEffect(() => {
    const fetchId = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setFilterId(data.meals);
    };
    fetchId();
    setApp(id);
  }, []);

  useEffect(() => {
    const IdFetch = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setRecomendations(data.drinks);
    };
    IdFetch();
  }, []);

  const urlCopy = () => {
    copy(hrefUrl);
    setCopying(!copying);
  };

  const recomendationsFilter = recomendations.filter((_e, index) => index <= +'5');
  useEffect(() => {
    if (filterId.length) {
      setFavorite({
        id: filterId[0].idMeal,
        type: 'food',
        nationality: filterId[0].strArea,
        category: filterId[0].strCategory,
        alcoholicOrNot: '',
        name: filterId[0].strMeal,
        image: filterId[0].strMealThumb,
      });
    }
  }, [filterId, setFavorite]);

  const ingredients = filterId.length
  && Object.entries(filterId[0]).reduce((acc, e) => {
    if (e[0].includes('strIngredient')) {
      acc.push(e[1]);
    }
    return acc;
  }, []);

  const measuresObject = filterId.length && Object.entries(filterId[0])
    .reduce((acc, el) => {
      if (el[0].includes('strMeasure')) {
        acc.push(el[1]);
      }
      return acc;
    }, []);

  return (
    filterId.length && (
      <div className="recipe-details-container">
        <img
          src={ filterId[0].strMealThumb }
          alt="imagem da receita"
          data-testid="recipe-photo"
          width="250rem"
        />
        <h1 data-testid="recipe-title">{filterId[0].strMeal}</h1>
        <h2 data-testid="recipe-category">{filterId[0].strCategory}</h2>
        <ul>
          {ingredients.filter((el) => el !== '' && el !== null).map((e, i) => (
            <li
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              {`${e} ${measuresObject[i]}`}
            </li>
          ))}
        </ul>
        <div className="button-container">
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => urlCopy() }
          >
            <img
              src={ shareIcon }
              alt="icone perfil"
            />
          </button>
          {copying && <span>Link copied!</span>}
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ () => favoriteRecipe() }
            src={ foods ? blackHeartIcon : whiteHeartIcon }
          >
            <img src={ foods ? blackHeartIcon : whiteHeartIcon } alt="icone perfil" />
          </button>
        </div>
        <div className="instructions-container">
          <h3 data-testid="instructions">{filterId[0].strInstructions}</h3>
        </div>
        <iframe
          data-testid="video"
          src={ filterId[0].strYoutube.replace('watch?v=', 'embed/') }
          frameBorder="0"
          title="Embedded youtube"
        />
        <div className="recomendation-container">
          {recomendationsFilter.length
            && recomendationsFilter.map((e, i) => (
              <div
                key={ e.strDrink }
                data-testid={ `${i}-recomendation-card` }
              >
                <img
                  src={ e.strDrinkThumb }
                  alt="img da receita"
                  width="250rem"
                />
                <h3 data-testid={ `${i}-recomendation-title` }>{e.strDrink}</h3>
              </div>
            ))}
        </div>
        <div className="link-container">
          <Link to={ `/foods/${id}/in-progress` }>
            <button
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => ingredients && saveRecipesInProgress('',
                ingredients.filter((item) => item !== null)) }
            >
              Continue Recipe
            </button>
          </Link>
        </div>
      </div>
    )
  );
}

export default RecipeDetailsFood;
