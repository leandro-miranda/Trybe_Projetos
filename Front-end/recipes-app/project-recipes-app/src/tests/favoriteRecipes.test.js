import React from "react";
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoriteRecipes from "../Pages/FavoriteRecipes";

describe("FavoriteRecipes test", () => {
  Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: () => {},
    },
  });

  it("should test favoriteRecipes", async () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => (
      { 
        type,
        items,
        setItems,
        setType,
        categories,
      })
    );

    localStorage.setItem('favoriteRecipes', JSON.stringify([
      {
      alcoholicOrNot: "",
      category: "Side",
      id: "52977",
      image: "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
      name: "Corba",
      nationality: "Turkish",
      type: "food",
    },
    {
      alcoholicOrNot: "Alcoholic",
      category: "Cocktail",
      id: "17225",
      image: "https://www.thecocktaildb.com/images/media/drink/l3cd7f1504818306.jpg",
      name: "Ace",
      nationality: "",
      type: "drink",
    }
  ]));

    renderWithRouter(<FavoriteRecipes />);

    const allFilter = screen.getByTestId("filter-by-all-btn");
    const foodFilter = screen.getByTestId("filter-by-food-btn");
    const drinkFilter = screen.getByTestId("filter-by-drink-btn");

    userEvent.click(drinkFilter);
    userEvent.click(foodFilter);
    userEvent.click(allFilter);

    userEvent.click(screen.getByTestId("1-horizontal-favorite-btn"));
    userEvent.click(screen.getByTestId("0-horizontal-share-btn"));
  });
});
