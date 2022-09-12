import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';
import DoneRecipes from '../Pages/DoneRecipes';
import Provider from '../context/Provider';
// import localStorageMock from './utils/localStorageMock';

const doneRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot:  'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
]

describe('Testes da pagina doneRecipes', () => {
  test('Testa se renderiza as receitas a partir do localStorage', async() => {
    window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes))
    renderWithRouter(<DoneRecipes /> )
    const foodImage = screen.getByTestId('0-horizontal-image')
    const drinkImage = screen.getByTestId('1-horizontal-image')
    expect(foodImage).toBeInTheDocument()
    expect(drinkImage).toBeInTheDocument()
  })
  
  
})
