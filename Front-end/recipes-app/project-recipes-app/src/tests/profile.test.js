import React from "react";
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import Profile from '../Pages/Profile';

describe("Profile test", () => {
  it("should", () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginBtn);

    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);

    const logout = screen.getByTestId('profile-logout-btn');
    userEvent.click(logout);
  });
  
  test('testando o botão Done Recipes', () => {
    const { history } = renderWithRouter(<Profile />);

    const btnDoneRecipes = screen.getByTestId("profile-done-btn")

    userEvent.click(btnDoneRecipes)

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });

  test('testando o botão Favorite Recipes', () => {
    const { history } = renderWithRouter(<Profile />);
    const btnFavoriteRecipes = screen.getByTestId("profile-favorite-btn")

    userEvent.click(btnFavoriteRecipes)

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });


  test('testando o botão Logout', () => {
    const { history } = renderWithRouter(<Profile />);
    const btnLogout = screen.getByTestId("profile-logout-btn")

    userEvent.click(btnLogout)

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
