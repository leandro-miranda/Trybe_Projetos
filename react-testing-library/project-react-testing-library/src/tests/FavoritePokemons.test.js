import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';
import { FavoritePokemons } from '../pages';

test('', () => {});

const pokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: `This intelligent Pokémon roasts hard berries
     with electricity to make them tender enough to eat.`,
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 4',
        map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
      },
      {
        location: 'Kanto Rock Tunnel',
        map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
    summary: `The flame on its tail shows the strength of its life force.
     If it is weak, the flame also burns weakly.`,
  },
];

describe('Requisito 3, <FavoritePokemons.js />', () => {
  test(`se é exibida na tela a mensagem No favorite pokemon found, 
  caso a pessoa não tenha pokémons favoritos`, () => {
    renderWithRouter(<App />);

    const linkFavoritePokemon = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavoritePokemon);
    const textNoFavoPoke = screen.getByText(/no favorite pokemon found/i);
    expect(textNoFavoPoke).toBeInTheDocument();
  });

  test('se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const pokemonFavoriteOne = screen.getByText(/pikachu/i);
    const pokemonFavoriteTwo = screen.getByText(/charmander/i);
    expect(pokemonFavoriteOne).toBeInTheDocument();
    expect(pokemonFavoriteTwo).toBeInTheDocument();
  });
});
