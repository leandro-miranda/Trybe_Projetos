import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

test('', () => {});

describe('Requisito 2, <About.js />', () => {
  test('se a página contém informações sobre a Pokédex', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /About/i });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);

    const informationOne = (/this application simulates a Pokédex.../i);
    const informationTwo = (/One can filter Pokémons by type.../i);
    const informations = screen.getByText(informationOne && informationTwo);
    expect(informations).toBeInTheDocument();
  });

  test('se a página contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /About/i });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);

    const textHeading = screen.getByRole('heading', { name: /about pokédex/i });
    expect(textHeading).toBeInTheDocument();
  });

  test('se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /About/i });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);

    const image = screen.getByAltText(/pokédex/i);
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    // https://stackoverflow-com.translate.goog/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt-BR&_x_tr_pto=wapp
  });
});
