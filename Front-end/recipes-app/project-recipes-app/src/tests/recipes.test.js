import React from 'react';
import { screen } from '@testing-library/react'
import renderWithRouter from '../helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetchMock from '../../cypress/mocks/fetch';

beforeEach(()=> {
  global.fetch = jest.fn(fetchMock)
});

  const EMAIL_USER = 'testes@testando.com';
  const SENHA_USER = '1234567';

describe('Testa a tela de Receitas', () => {
  it('Testa na página de Foods', async () => {
    const { history } =renderWithRouter(<App />);

    const email = screen.getByTestId("email-input");
    const senha = screen.getByTestId("password-input");

    userEvent.type(email, EMAIL_USER);
    userEvent.type(senha, SENHA_USER);

    const loginButton = screen.getByTestId("login-submit-btn");
    userEvent.click(loginButton);

    const renderFoods = await screen.findByText("Foods");
    expect(renderFoods).toBeInTheDocument();

    const buttonBeef = await screen.findByTestId("Beef-category-filter");
    expect(buttonBeef).toBeInTheDocument();

    const buttonBreakfast = await screen.findByTestId("Breakfast-category-filter");
    expect(buttonBreakfast).toBeInTheDocument();

    const buttonChicken = await screen.findByTestId("Chicken-category-filter");
    expect(buttonChicken).toBeInTheDocument();

    const buttonDessert = await screen.findByTestId("Dessert-category-filter");
    expect(buttonDessert).toBeInTheDocument();

    userEvent.click(buttonDessert);
    userEvent.click(screen.getByTestId("0-card-img"));
    history.push('/foods');

    const buttonGoat = await screen.findByTestId("Goat-category-filter");
    expect(buttonGoat).toBeInTheDocument();

    userEvent.click(buttonGoat);
    userEvent.click(screen.getByTestId("0-card-img"));
    history.push('/foods');

  });

  it('Testa na página de Drinks', async () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId("email-input");
    const senha = screen.getByTestId("password-input");

    userEvent.type(email, EMAIL_USER);
    userEvent.type(senha, SENHA_USER);

    const loginButton = screen.getByTestId("login-submit-btn");
    userEvent.click(loginButton);


    const iconDrink = await screen.findByTestId("drinks-bottom-btn");
    expect(iconDrink).toBeInTheDocument();
    userEvent.click(iconDrink);

    const renderDrinks = await screen.findByText("Drinks");
    expect(renderDrinks).toBeInTheDocument();

    const buttonOrdinaryDrink = await screen.findByTestId("Ordinary Drink-category-filter");
    expect(buttonOrdinaryDrink).toBeInTheDocument();

    const buttonCocktail = await screen.findByTestId("Cocktail-category-filter");
    expect(buttonCocktail).toBeInTheDocument();

    const buttonShake = await screen.findByTestId("Shake-category-filter");
    expect(buttonShake).toBeInTheDocument();

    const buttonOtherUnknown = await screen.findByTestId("Other/Unknown-category-filter");
    expect(buttonOtherUnknown).toBeInTheDocument();

    const buttonCocoa = await screen.findByTestId("Cocoa-category-filter");
    expect(buttonCocoa).toBeInTheDocument();

    userEvent.click(buttonShake);

  });

  test('Testing if have images cards and your length in food recipes page', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods')

    const allImageCards = await screen.findAllByRole("img");

    expect(allImageCards).toHaveLength(2);
    expect(history.location.pathname).toBe('/foods');

  })
  test('testing if filters work correctly', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods')

    const beefFilter = await screen.findByRole("button", { name: /beef/i });
    userEvent.click(beefFilter);
    // screen.logTestingPlaygroundURL();
  })
})

  test('Testing if have images cards and your length in drink recipes page', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks')

    const allImageCards = await screen.findAllByRole("img");

    expect(allImageCards).toHaveLength(2);
    expect(history.location.pathname).toBe('/drinks');

  })

