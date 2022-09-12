import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [copied, setCopied] = useState(false);
  const [arrayRecipes, setArrayRecipes] = useState([]);

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    setArrayRecipes(getLocalStorage);
  }, []);

  const copyUrl = (link) => {
    copy(link);
    setCopied(!copied);
  };

  const filter = (param) => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    setArrayRecipes(doneRecipes && doneRecipes.filter((e) => e.type === param));
  };

  return (
    <>
      <Header title="Done Recipes" bool={ false } />
      {arrayRecipes && (
        <div>
          <div>
            <button
              type="button"
              data-testid="filter-by-all-btn"
              onClick={ () => setArrayRecipes(JSON.parse(localStorage
                .getItem('doneRecipes'))) }
            >
              All
            </button>
            <button
              type="button"
              data-testid="filter-by-food-btn"
              onClick={ () => filter('food') }
            >
              Foods
            </button>
            <button
              type="button"
              data-testid="filter-by-drink-btn"
              onClick={ () => filter('drink') }
            >
              Drinks
            </button>
          </div>
          {arrayRecipes.map((e, i) => (
            <div key={ i }>
              <Link to={ `/${e.type}s/${e.id}` }>
                <img
                  data-testid={ `${i}-horizontal-image` }
                  src={ e.image }
                  alt=""
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
              {e.tags.map((item, index) => (
                <h3 key={ index } data-testid={ `${i}-${item}-horizontal-tag` }>
                  {item}
                </h3>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default DoneRecipes;
