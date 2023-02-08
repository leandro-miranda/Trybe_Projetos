import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { customer } from '../mocks/user';

const customerLogin = () => {
  jest.spyOn(axios, 'post').mockResolvedValue(customer);

  const inputEmail = screen.getByTestId('common_login__input-email');
  const inputPassword = screen.getByTestId('common_login__input-password');
  const btnLogin = screen.getByTestId('common_login__button-login');

  userEvent.type(inputEmail, 'zebirita@email.com');
  userEvent.type(inputPassword, '$#zebirita#$');

  expect(inputEmail).toHaveValue('zebirita@email.com');
  expect(inputPassword).toHaveValue('$#zebirita#$');
  expect(btnLogin).toBeEnabled();

  userEvent.click(btnLogin);
};

const sellerLogin = () => {
  jest.spyOn(axios, 'post').mockResolvedValue(customer);

  const inputEmail = screen.getByTestId('common_login__input-email');
  const inputPassword = screen.getByTestId('common_login__input-password');
  const btnLogin = screen.getByTestId('common_login__button-login');

  userEvent.type(inputEmail, 'fulana@deliveryapp.com');
  userEvent.type(inputPassword, 'fulana@123');

  expect(inputEmail).toHaveValue('fulana@deliveryapp.com');
  expect(inputPassword).toHaveValue('fulana@123');
  expect(btnLogin).toBeEnabled();

  userEvent.click(btnLogin);
};

export { customerLogin, sellerLogin };
