import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

test('', () => {});
describe('Requisito 6, <Pokemon.js />', () => {
  test('se é renderizado um card com as informações de um determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(/pikachu/i);
    expect(screen.getByTestId('pokemon-type')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(/electric/i);
    expect(screen.getByTestId('pokemon-weight')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent(/average weight: 6.0 kg/i);
    expect(screen.getByAltText(/pikachu sprite/i)).toBeInTheDocument();
    expect(screen.getByAltText(/pikachu sprite/i).src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test(`se o card do pokémon indicado na Pokédex contém um link de navegação
   para exibir detalhes deste pokémon. O link deve possuir a URL /pokemons/<id>, 
   onde <id> é o id do pokémon exibido`, () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const btnDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(btnDetails);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  test('se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const imgFavoriteStar = screen.getByRole('img',
      { name: /pikachu is marked as favorite/i });
    expect(imgFavoriteStar).toHaveProperty('src', 'http://localhost/star-icon.svg');
  });
});
