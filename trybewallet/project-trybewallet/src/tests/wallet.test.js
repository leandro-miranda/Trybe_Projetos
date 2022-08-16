import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, within } from '@testing-library/react';
import App from '../App';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

const exchangeMock =  jest.spyOn(global, 'fetch').mockResolvedValue({
  json: jest.fn().mockResolvedValue(mockData),
  ok: true, 
});

describe('Crie um header para a página de carteira contendo as seguintes características', () => {
  test('se a rota "/carteira" existe', () => {
    const {history} = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btn = screen.getByRole('button');

    userEvent.type(email, 'test@email.com');
    userEvent.type(password, '1234567');
    userEvent.click(btn);

    expect(history.location.pathname).toBe('/carteira');

  });

  test('se as funcionalidades do adicionar despesas está funcionando', () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId('value-input');
    const inputEmail = screen.getByTestId('email-field');
    const total = screen.getByTestId('total-field');
    const currency = screen.getByTestId('header-currency-field');
    const inputDescription = screen.getByTestId('description-input');
    const inputCurrency = screen.getByTestId('currency-input'); 
    const inputMethod = screen.getByTestId('method-input'); 
    const inputTag = screen.getByTestId('tag-input'); 
   

    expect(inputValue.id).toBe('value')
    expect(inputEmail).toBeInTheDocument()
    expect(total).toBeInTheDocument()
    expect(currency).toBeInTheDocument
    expect(inputDescription.id).toBe('description')
    expect(inputCurrency.id).toBe('currency')
    expect(inputMethod.id).toBe('method')
    expect(inputTag.id).toBe('tag')
  })

  test('se um campo que mostre que qual câmbio está sendo utilizado', () => {
    renderWithRouterAndRedux(<Wallet />, '/carteira');
    const exchange = screen.getByTestId('header-currency-field');

    expect(exchange).toBeInTheDocument();
  });

  test('se tem um campo para selecionar qual método de pagamento será utilizado', () => {
    renderWithRouterAndRedux(<Wallet />, '/carteira');
       
    const dinheiro = screen.getByRole('option', { name: /dinheiro/i });
    const credito = screen.getByRole('option', { name: /cartão de crédito/i });
    const debito = screen.getByRole('option', { name: /cartão de débito/i });

    expect(dinheiro).toBeInTheDocument();
    expect(credito).toBeInTheDocument();
    expect(debito).toBeInTheDocument(); 
  })
  
  test('se tem um campo para selecionar qual tag será utilizada', async () => {
    renderWithRouterAndRedux(<Wallet />, '/carteira');
    
    const inputTag = await screen.findByRole('combobox', {
      name: /tag/i
    });
    // const alimentacao = await screen.findByRole('cell', { name: /alimentação/i });
    const lazer = screen.getByRole('option', { name: /lazer/i });
    const trabalho = screen.getByRole('option', { name: /trabalho/i });
    const transporte = screen.getByRole('option', { name: /transporte/i });
    // const saude = screen.getByRole('cell', { name: /saude/i });

    expect(inputTag).toBeInTheDocument();
    // expect(alimentacao).toBeInTheDocument();
    expect(lazer).toBeInTheDocument();
    expect(trabalho).toBeInTheDocument(); 
    expect(transporte).toBeInTheDocument();
    // expect(saude).toBeInTheDocument();
  })  
  
  test('se tem um campo para adicionar a descrição da despesa', async () => {
    renderWithRouterAndRedux(<Wallet />, '/carteira');
    const descricao = await screen.findByRole('textbox', {
      name: /descrição/i,
    });

    expect(descricao).toBeInTheDocument();
  });

  test('se tem um campo para selecionar em qual moeda será registrada a despesa', async () => {
    renderWithRouterAndRedux(<Wallet />, '/carteira');
    const inputCurrency = await screen.findByRole('combobox', {
      name: /moeda/i,
    });

    const optionsCoin = within(inputCurrency).getAllByRole('option');
    const valueOptionsCoin = optionsCoin.map((optionCoin) => optionCoin.value);

    const expectedOptionsCoin = [
      'USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC',
      'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE',
    ];

    expect(valueOptionsCoin).toEqual(expectedOptionsCoin);

    expect(exchangeMock).toBeCalled();
    expect(exchangeMock).toBeCalledWith('https://economia.awesomeapi.com.br/json/all');
    expect(inputCurrency).toBeInTheDocument();
  });
})