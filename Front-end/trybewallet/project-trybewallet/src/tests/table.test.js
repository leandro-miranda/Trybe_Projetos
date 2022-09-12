import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

const exchangeMock =  jest.spyOn(global, 'fetch').mockResolvedValue({
  json: jest.fn().mockResolvedValue(mockData),
  ok: true, 
});

describe(' Desenvolva a opção de "Adicionar despesa" na sua tabela de gastos', () => {
  test('se um botão com o texto \'Adicionar despesa\' que salva as informações da despesa no estado global e atualiza a soma de despesas no header', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, '/carteira');

    const addButton = await screen.findByRole('button', {
      name: /adicionar despesa/i,
    });
    const valueInput = await screen.findByLabelText(/valor/i);
    const currencyInput = await screen.findByRole('combobox', {
      name: /moeda/i,
    });
    const methodInput = await screen.findByRole('combobox', {
      name: /método de pagamento/i,
    });
    const tagInput = await screen.findByRole('combobox', {
      name: /tag/i,
    });
    const descriptionInput = await screen.findByRole('textbox', {
      name: /descrição/i,
    });

    userEvent.type(valueInput, '10');
    userEvent.selectOptions(currencyInput, 'USD');
    userEvent.selectOptions(methodInput, 'Cartão de crédito');
    userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.type(descriptionInput, 'Dez dólares');
    userEvent.click(addButton);

    await waitFor(() => {
      expect(exchangeMock).toBeCalledTimes(2);
    });

    const expectedExpense = [
      {
        id: 0,
        value: '10',
        currency: 'USD',
        method: 'Cartão de crédito',
        tag: 'Lazer',
        description: 'Dez dólares',
        exchangeRates: mockData,
      },
    ];

    expect(store.getState().wallet.expenses).toStrictEqual(expectedExpense);

    userEvent.type(valueInput, '20');
    userEvent.selectOptions(currencyInput, 'EUR');
    userEvent.selectOptions(methodInput, 'Cartão de débito');
    userEvent.selectOptions(tagInput, 'Trabalho');
    userEvent.type(descriptionInput, 'Vinte euros');
    userEvent.click(addButton);

    await waitFor(() => {
      expect(exchangeMock).toBeCalledTimes(3);
    });

    const expectedExpenseTwo = [
      {
        id: 0,
        value: '10',
        currency: 'USD',
        method: 'Cartão de crédito',
        tag: 'Lazer',
        description: 'Dez dólares',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '20',
        currency: 'EUR',
        method: 'Cartão de débito',
        tag: 'Trabalho',
        description: 'Vinte euros',
        exchangeRates: mockData,
      },
    ];

    expect(store.getState().wallet.expenses).toStrictEqual(expectedExpenseTwo);

    const fieldTotal = screen.getByTestId('total-field');
    expect(fieldTotal).toHaveTextContent(150.07);
  });
});