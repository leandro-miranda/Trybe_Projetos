import React from 'react';
import FoodCategories from '../components/FoodCategories';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Foods() {
  return (
    <div className="foods-container">
      <Header title="Foods" bool nameBtn="food" />
      <FoodCategories />
      <Recipes food />
      <Footer />
    </div>
  );
}

export default Foods;
