import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import pokemons from '../data';
import App from '../App';

test('', () => {});
describe('Requisito 5, <Pokedex.js />', () => {
  test('se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const textHeading = screen
      .getByRole('heading', { name: /encountered pokémons/i, level: 2 });
    expect(textHeading).toBeInTheDocument();
  });

  test(`se é exibido o próximo pokémon da lista 
  quando o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);

    const btn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(btn).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      expect(screen.getByText(`${pokemon.name}`)).toBeInTheDocument();
      userEvent.click(btn);
    });
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  test('se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId(/pokemon-name/i);
    expect(pokemon).toHaveLength(1);
  });

  test('se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const numberButtons = 7;
    const filteredButton = screen.getAllByTestId(/pokemon-type-button/i);

    expect(filteredButton).toHaveLength(numberButtons);
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /electric/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /fire/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /bug/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /poison/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /psychic/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /normal/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /dragon/i })).toHaveLength(1);

    userEvent.click(screen.getByRole('button', { name: /electric/i }));
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: /all/i });
    const pokemon = screen.getByRole('button', { name: /próximo pokémon/i });

    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);

    expect(screen.getByTestId(/pokemon-name/i)).toHaveTextContent(/pikachu/i);
    userEvent.click(pokemon);

    expect(screen.getByTestId(/pokemon-name/i)).toHaveTextContent(/charmander/i);
  });
});
