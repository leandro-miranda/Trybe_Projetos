import React from 'react';
import DrinksCategories from '../components/DrinkCategories';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <div className="drinks-container">
      <Header title="Drinks" bool nameBtn="drink" />
      <DrinksCategories />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
