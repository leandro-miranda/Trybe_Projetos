import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Tests the Footer component', () => {
  it('Tests if components render correctly',()=> {
    const {history} = renderWithRouter(<App />)
    history.push('/foods')

    const btnDrinks = screen.getByTestId('drinks-bottom-btn')
    const btnFood = screen.getByTestId('food-bottom-btn');

    expect(btnFood).toBeInTheDocument();
    expect(btnDrinks).toBeInTheDocument();
  });

  it('Tests if Footer can be redirect to foods or drinks', ()=> {
    const {history} = renderWithRouter(<App />)
    history.push('/foods')

    const btnDrinks = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(btnDrinks);
    expect(history.location.pathname).toBe('/drinks');
    const imgDrinks = screen.getByRole('img', { name: /drink/i });
    expect(imgDrinks).toHaveAttribute('src', 'drinkIcon.svg');
  });

  it('Tests if Footer can be redirect to foods or drinks', ()=> {
    const {history} = renderWithRouter(<App />)
    history.push('/foods')

    const btnFood = screen.getByTestId('food-bottom-btn');

    userEvent.click(btnFood);
    expect(history.location.pathname).toBe('/foods');
    const imgDrinks = screen.getByRole('img', { name: /drink/i });
    expect(imgDrinks).toHaveAttribute('src', 'drinkIcon.svg');
  });
});