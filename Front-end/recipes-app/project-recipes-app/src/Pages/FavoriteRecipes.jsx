import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [copied, setCopied] = useState(false);
  const [recipesArray, setRecipesArray] = useState([]);

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setRecipesArray(getLocalStorage);
  }, []);

  const copyUrl = (link) => {
    copy(link);
    setCopied(!copied);
  };

  const filtered = (param) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    setRecipesArray(favoriteRecipes && favoriteRecipes.filter((e) => e.type === param));
  };

  const recipeFavoriteRemove = (id) => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    localStorage.setItem('favoriteRecipes', (
      JSON.stringify(favorite.filter((e) => e.id !== id))
    ));
    setRecipesArray(favorite.filter((e) => e.id !== id));
  };

  return (
    <div>
      <Header title="Favorite Recipes" bool={ false } />
      {recipesArray && (
        <div>
          <div>
            <button
              type="button"
              data-testid="filter-by-all-btn"
              onClick={ () => setRecipesArray(JSON.parse(localStorage
                .getItem('favoriteRecipes'))) }
            >
              All
            </button>
            <button
              type="button"
              data-testid="filter-by-food-btn"
              onClick={ () => filtered('food') }
            >
              Foods
            </button>
            <button
              type="button"
              data-testid="filter-by-drink-btn"
              onClick={ () => filtered('drink') }
            >
              Drinks
            </button>
          </div>
          {recipesArray.map((e, i) => (
            <div key={ i }>
              <Link to={ `/${e.type}s/${e.id}` }>
                <img
                  data-testid={ `${i}-horizontal-image` }
                  src={ e.image }
                  alt=""
                  width="250rem"
                />
                <h3 data-testid={ `${i}-horizontal-top-text` }>
                  {e.type === 'food'
                    ? `${e.nationality} - ${e.category}`
                    : `${e.alcoholicOrNot}`}
                </h3>
                <h2 data-testid={ `${i}-horizontal-name` }>{e.name}</h2>
                <h3 data-testid={ `${i}-horizontal-done-date` }>{e.doneDate}</h3>
              </Link>
              <button
                type="button"
                data-testid={ `${i}-horizontal-share-btn` }
                onClick={ () => copyUrl(`${window.location.origin}/${e.type}s/${e.id}`) }
                src={ shareIcon }
              >
                <img src={ shareIcon } alt="icone de perfil" />
              </button>
              {copied && <p data-testid="link-copied">Link copied!</p>}
              <button
                type="button"
                data-testid={ `${i}-horizontal-favorite-btn` }
                onClick={ () => recipeFavoriteRemove(e.id) }
                src={ blackHeartIcon }
              >
                <img
                  src={ blackHeartIcon }
                  alt="icone de perfil"
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoriteRecipes;
