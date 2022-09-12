import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { meals } from "../../cypress/mocks/meals";
import oneDrink from "../../cypress/mocks/oneDrink";
import drinks from "../../cypress/mocks/drinks";
import oneMeal from "../../cypress/mocks/oneMeal";
import SearchBar from '../components/SearchBar';
import Provider from '../context/Provider';

afterEach(() => jest.clearAllMocks());

describe('SearchBar', () => {
  it('Renderiza componente SearchBar', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});

    renderWithRouter(<Provider><SearchBar /></Provider>);

    const searchButton = screen.getByTestId('exec-search-btn');
    userEvent.click(searchButton);

    const firstLetterOption = screen.getByTestId('first-letter-search-radio');
    const ingredientOption = screen.getByTestId('ingredient-search-radio');
    const searchInput = screen.getByTestId('search-input');

    userEvent.type(searchInput, 'c');
    userEvent.click(firstLetterOption);
    userEvent.click(searchButton);

    userEvent.type(searchInput, 'ch');
    userEvent.click(firstLetterOption);
    userEvent.click(searchButton);

    userEvent.type(searchInput, 'chicken');
    userEvent.click(ingredientOption);
    userEvent.click(searchButton);

    userEvent.type(searchInput, 'Arrabiata');
    const nameOption = screen.getByTestId('name-search-radio');
    userEvent.click(nameOption);
    userEvent.click(searchButton);
  });

  it('Renderiza componente SearchBar', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});

    renderWithRouter(<Provider><SearchBar /></Provider>);

    const searchButton = screen.getByTestId('exec-search-btn');

    const firstLetterOption = screen.getByTestId('first-letter-search-radio');
    const ingredientOption = screen.getByTestId('ingredient-search-radio');
    const searchInput = screen.getByTestId('search-input');

    userEvent.type(searchInput, 'w');
    userEvent.click(firstLetterOption);
    userEvent.click(searchButton);

    userEvent.type(searchInput, 'wi');
    userEvent.click(firstLetterOption);
    userEvent.click(searchButton);

    userEvent.type(searchInput, 'Wine');
    userEvent.click(ingredientOption);
    userEvent.click(searchButton);
  });

  it('renderiza só um drink', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});

    renderWithRouter(<Provider><SearchBar /></Provider>);

    const searchButton = screen.getByTestId('exec-search-btn');
    const searchInput = screen.getByTestId('search-input');

    userEvent.type(searchInput, 'Aquamarine');
    const nameOption = screen.getByTestId('name-search-radio');
    userEvent.click(nameOption);
    userEvent.click(searchButton);
  });

  it('renderiza só um meal', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});

    renderWithRouter(<Provider><SearchBar /></Provider>);

    const searchButton = screen.getByTestId('exec-search-btn');
    const searchInput = screen.getByTestId('search-input');

    userEvent.type(searchInput, 'Spicy Arrabiata Penne');
    const nameOption = screen.getByTestId('name-search-radio');
    userEvent.click(nameOption);
    userEvent.click(searchButton);
  });
});
