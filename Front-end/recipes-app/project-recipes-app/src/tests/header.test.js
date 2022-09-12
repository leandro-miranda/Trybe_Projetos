import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Header', () => {
   it('Ao navegar para a rota /foods, o cabeçalho e os botões especificados estão presentes',
    () => {
      const {history} = renderWithRouter(<App />)
      history.push('/foods')

      expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
      expect(screen.getByTestId('page-title')).toBeInTheDocument();
      expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
    });
  it('Redireciona para a página de perfil ao clicar no ícone do perfil',
    () => {
      const {history} = renderWithRouter(<App />)
      history.push('/foods')

      const btn = screen.getByTestId('profile-top-btn')
      userEvent.click(btn);
      expect(history.location.pathname).toBe('/profile');
    });
  it('A barra de pesquisa não fica visível quando a página é renderizada',
    () => {
      const searchInput = screen.queryByTestId('search-input');
      expect(searchInput).toBeNull();
    });
  it('A barra de pesquisa é exibida ao clicar no ícone de pesquisa',
    () => {
      const {history} = renderWithRouter(<App />)
      history.push('/foods')

      const searchBtn = screen.getByTestId('search-top-btn')
      const pageTitle = screen.getByTestId('page-title')

      expect(pageTitle).toBeInTheDocument();
      userEvent.click(searchBtn);
    });
});