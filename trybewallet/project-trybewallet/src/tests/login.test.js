import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouter, renderWithRouterAndRedux } from './helpers/renderWith';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from '../App';
import rootReducer from '../redux/reducers';

const EMAIL_ID = 'email-input';
const PASSWORD_ID = 'password-input';
const EMAIL_VALIDITY = 'test@email.com';
const PASSWORD_VALIDITY = '1234567';

beforeEach(() => jest.restoreAllMocks());

describe('Crie uma página inicial de login com os seguintes campos e características', () => {
  test('se a rota para a página "/"', () => {
    const {history} = renderWithRouterAndRedux(<App />, '/');
    expect(history.location.pathname).toBe('/');
  })

  test('se tem um local para inserir email e senha', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(EMAIL_ID);
    const password = screen.getByTestId(PASSWORD_ID);
  
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  })

  test('se existe um botão com o texto Entrar', () => {
    renderWithRouterAndRedux(<App />);

    const textBtn = screen.getByText(/entrar/i);
    expect(textBtn).toBeInTheDocument();
  })

  test('se o botão está desabilitado ao entrar na página', () => {
    renderWithRouterAndRedux(<App />, '/');

    const btn = screen.getByText(/entrar/i);
    expect(btn).toBeDisabled();
  })

  test('se o botão está desabilitado quando o email é inválido', () => {
    renderWithRouterAndRedux(<App />, '/');
    const email = screen.getByTestId(EMAIL_ID);
    const password = screen.getByTestId(PASSWORD_ID);
    const btn = screen.getByText(/entrar/i);

    userEvent.type(email, 'email');
    userEvent.type(password, PASSWORD_VALIDITY)
    expect(btn).toBeDisabled();

    userEvent.type(email, 'test@.com');
    userEvent.type(password, PASSWORD_VALIDITY)
    expect(btn).toBeDisabled();

    userEvent.type(email, 'testemail.com');
    userEvent.type(password, PASSWORD_VALIDITY)
    expect(btn).toBeDisabled();
  })

  test('se o botão está desabilitado quando a senha é inválida', () => {
    renderWithRouterAndRedux(<App />, '/');
    const email = screen.getByTestId(EMAIL_ID);
    const password = screen.getByTestId(PASSWORD_ID);
    const btn = screen.getByText(/entrar/i);

    userEvent.type(email, EMAIL_VALIDITY);
    userEvent.type(password, '1235')
    expect(btn).toBeDisabled();

    userEvent.type(email, EMAIL_VALIDITY);
    userEvent.type(password, '12315')
    expect(btn).toBeDisabled();
  })

  test('se o botão está habilitado quando email e senha são válidos', () => {
    renderWithRouterAndRedux(<App />, '/');
    const email = screen.getByTestId(EMAIL_ID);
    const password = screen.getByTestId(PASSWORD_ID);
    const btn = screen.getByText(/entrar/i);

    userEvent.type(email, EMAIL_VALIDITY);
    userEvent.type(password, PASSWORD_ID);
    expect(btn).toBeEnabled();
  })

  test('se a rota muda para "/carteira" após clicar no botão', () => {
    const {history} = renderWithRouterAndRedux(<App />, '/');
    const email = screen.getByTestId(EMAIL_ID);
    const password = screen.getByTestId(PASSWORD_ID);
    const btn = screen.getByText(/entrar/i);

    userEvent.type(email, EMAIL_VALIDITY);
    userEvent.type(password, PASSWORD_ID);
    userEvent.click(btn);

    expect(history.location.pathname).toBe('/carteira');
  });

  test(' se a tela de login é renderizada corretamente', () => {
     const store = createStore(rootReducer);

    renderWithRouter(
      <Provider store={ store }>
        <App />
      </Provider>, ['/login'],
    );

    expect(screen.getByRole('textbox', /digite seu emaill/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/digite sua senha/i)).toBeInTheDocument();
  });
});