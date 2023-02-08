import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import renderWith from './utils/render';
import App from '../App';

const btnRegisterText = 'common_login__button-register';
const inputEmailTestId = 'common_register__input-email';
const inputNameTestId = 'common_register__input-name';
const inputPasswordTestId = 'common_register__input-password';
const btnRegisterTestId = 'common_register__button-register';

describe('test component Register', () => {
  afterEach(() => localStorage.clear());

  it('should be redirect to Register Component', async () => {
    const { history } = await renderWith(<App />);

    const btnRegister = screen.getByTestId(btnRegisterText);

    userEvent.click(btnRegister);

    expect(history.location.pathname).toEqual('/register');
  });

  it('should be fields exists in Register component', async () => {
    const { history } = await renderWith(<App />);

    const btnRegister = screen.getByTestId(btnRegisterText);

    userEvent.click(btnRegister);

    expect(history.location.pathname).toEqual('/register');

    const inputName = screen.getByTestId(inputNameTestId);
    const inputEmail = screen.getByTestId(inputEmailTestId);
    const inputPassword = screen.getByTestId(inputPasswordTestId);
    const btnSubmitRegister = screen.getByTestId(btnRegisterTestId);

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnSubmitRegister).toBeInTheDocument();
    expect(btnSubmitRegister).toBeDisabled();
  });

  it('should be register user', async () => {
    const { history } = await renderWith(<App />);

    const btnRegister = screen.getByTestId(btnRegisterText);

    userEvent.click(btnRegister);

    expect(history.location.pathname).toEqual('/register');

    const inputName = screen.getByTestId(inputNameTestId);
    const inputEmail = screen.getByTestId(inputEmailTestId);
    const inputPassword = screen.getByTestId(inputPasswordTestId);
    const btnSubmitRegister = screen.getByTestId(btnRegisterTestId);

    userEvent.type(inputName, '');
    userEvent.type(inputEmail, '');
    userEvent.type(inputPassword, '');
    userEvent.click(btnSubmitRegister);
  });

  it('should be not register user with invalid data', async () => {
    const { history } = await renderWith(<App />);

    const btnRegister = screen.getByTestId(btnRegisterText);

    userEvent.click(btnRegister);

    expect(history.location.pathname).toEqual('/register');

    jest.spyOn(axios, 'post').mockResolvedValue({});

    const inputName = screen.getByTestId(inputNameTestId);
    const inputEmail = screen.getByTestId(inputEmailTestId);
    const inputPassword = screen.getByTestId(inputPasswordTestId);
    const btnSubmitRegister = screen.getByTestId(btnRegisterTestId);

    userEvent.type(inputName, 'zé birita customer');
    userEvent.type(inputEmail, 'zebirita@email.com');
    userEvent.type(inputPassword, '21412415161621y631');

    expect(btnSubmitRegister).toBeEnabled();

    act(() => {
      userEvent.click(btnSubmitRegister);
    });

    const err = await screen
      .findByTestId('common_register__element-invalid_register');

    expect(err).toBeDefined();
  });
});
