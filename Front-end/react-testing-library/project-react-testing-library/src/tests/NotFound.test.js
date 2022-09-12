import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import { NotFound } from '../pages';

test('', () => {});
describe('Requisito 4, <NotFound />', () => {
  test('se a página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const textHeading = screen
      .getByRole('heading', { name: /page requested not found/i });
    expect(textHeading).toBeInTheDocument();
  });

  test('se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    renderWithRouter(<NotFound />);

    const imageNotFound = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(imageNotFound)
      .toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
