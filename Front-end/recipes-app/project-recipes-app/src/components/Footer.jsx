import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  const drinksButton = () => {
    history.push('/drinks');
  };
  const foodsButton = () => {
    history.push('/foods');
  };

  return (
    <div data-testid="footer" className="footer">
      <input
        type="image"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        alt="drinks"
        onClick={ drinksButton }
      />
      <input
        type="image"
        data-testid="food-bottom-btn"
        src={ mealIcon }
        alt="foods"
        onClick={ foodsButton }
      />
    </div>
  );
}

export default Footer;
