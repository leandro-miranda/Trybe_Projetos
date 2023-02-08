import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import renderWith from './utils/render';
import App from '../App';
import { customerLogin } from './utils/login';

const btnRegisterText = 'common_login__button-register';

describe('test component Login', () => {
  afterEach(() => localStorage.clear());

  it('should be fields exists in Login component', async () => {
    const { history } = await renderWith(<App />);

    expect(history.location.pathname).toEqual('/login');

    const inputEmail = screen.getByTestId('common_login__input-email');
    const inputPassword = screen.getByTestId('common_login__input-password');
    const btnLogin = screen.getByTestId('common_login__button-login');
    const btnRegister = screen.getByTestId(btnRegisterText);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();
    expect(btnLogin).toBeDisabled();
    expect(btnRegister).toBeInTheDocument();
  });

  it('should be redirect to Products Component', async () => {
    const { history } = await renderWith(<App />);

    customerLogin();

    const checkout = await screen
      .findByTestId('customer_products__checkout-bottom-value');
    expect(checkout).toBeInTheDocument();
    expect(history.location.pathname).toEqual('/customer/products');
  });

  it('should be not login with user invalid data', async () => {
    await renderWith(<App />);

    jest.spyOn(axios, 'post').mockResolvedValue({});

    const inputEmail = screen.getByTestId('common_login__input-email');
    const inputPassword = screen.getByTestId('common_login__input-password');
    const btnLogin = screen.getByTestId('common_login__button-login');

    userEvent.type(inputEmail, 'icar@email.com');
    userEvent.type(inputPassword, '21412415161621y631');

    expect(btnLogin).toBeEnabled();

    act(() => {
      userEvent.click(btnLogin);
    });

    const err = await screen
      .findByTestId('common_login__element-invalid-email');

    expect(err).toBeDefined();
  });
});
