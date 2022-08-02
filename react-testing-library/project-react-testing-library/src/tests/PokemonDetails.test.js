import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

test('', () => {});
describe('Requisito 7, <PokemonDetails.js />', () => {
  test(`se as informações detalhadas do pokémon 
  selecionado são mostradas na tela`, () => {
    renderWithRouter(<App />);

    const btnDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(btnDetails);
    expect(screen.getByRole('heading', { name: /pikachu details/i }))
      .toHaveTextContent(/pikachu details/i);
    expect(btnDetails).not.toBeInTheDocument();

    const heading = screen.getByRole('heading', { name: /summary/i });
    expect(heading).toBeInTheDocument();

    expect(screen.getByText(/this intelligent Pokémon roasts hard berries/i))
      .toBeInTheDocument();
  });

  test(`se existe na página uma seção com os mapas 
  contendo as localizações do pokémon`, () => {
    renderWithRouter(<App />);

    const btnDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(btnDetails);

    expect(screen.getByRole('heading', { name: /game locations of pikachu/i }))
      .toBeInTheDocument();
    expect(screen.getByText(/kanto viridian forest/i)).toBeInTheDocument();
    expect(screen.getByText(/kanto power plant/i)).toBeInTheDocument();
    expect(screen.getAllByRole('img', { name: /pikachu location/i })[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(screen.getAllByRole('img', { name: /pikachu location/i })[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(screen.getAllByRole('img', { name: /pikachu location/i })[0].alt)
      .toBe('Pikachu location');
    expect(screen.getAllByRole('img', { name: /pikachu location/i })[1].alt)
      .toBe('Pikachu location');
  });

  test('se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const btnDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(btnDetails);

    const checkbox = screen.getByText(/pokémon favoritado?/i);
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    userEvent.click(checkbox);
    userEvent.click(checkbox);
    userEvent.click(checkbox);
    userEvent.click(checkbox);
    userEvent.click(screen.getByRole('link', { name: /favorite pokémons/i }));
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});
