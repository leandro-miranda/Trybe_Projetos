import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

test('', () => {});

describe('Requisito 1, <App.js />', () => {
  test('se o topo da aplicação contém um conjunto de links de navegação', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    const linkAbout = screen.getByRole('link', { name: /About/i });
    const linkFavoritePokemon = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemon).toBeInTheDocument();
  });

  test('se a aplicação é redirecionada para a página inicial ao clicar no link Home',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkHome = screen.getByRole('link', { name: /Home/i });
      userEvent.click(linkHome);
      expect(history.location.pathname).toBe('/');
    });

  test('se a aplicação é redirecionada para a página About ao clicar no link About',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkAbout = screen.getByRole('link', { name: /About/i });
      userEvent.click(linkAbout);
      expect(history.location.pathname).toBe('/about');
    });

  test(
    'se a aplicação é redirecionada para Pokémons Favoritados ao clicar no link Favorite',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkFavoritePokemon = screen
        .getByRole('link', { name: /Favorite Pokémons/i });
      userEvent.click(linkFavoritePokemon);
      expect(history.location.pathname).toBe('/favorites');
    },
  );

  test('se a aplicação é redirecionada para a página Not Found com URL desconhecida',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/linkdesconhecido');

      expect(screen.getByText(/page requested not found/i)).toBeInTheDocument();
    });
});
