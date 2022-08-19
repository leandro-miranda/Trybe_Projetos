import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dataTest from './dataTest';
import App from '../App';
import { act } from 'react-dom/test-utils'; // https://pt-br.reactjs.org/docs/test-utils.html#act

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(dataTest),
    })
  );
});
afterEach(() => {
  jest.resetAllMocks();
});

describe('Testando a página Star Wars', () => {

  test('se existe busca pelos planetas', () => {
    render(<App />);

    const planet = screen.getByText(/filtrar/i);
    expect(planet).toBeInTheDocument();
  });

  test('se existe a palavra ordenar', () => {
    render(<App />);

    const element = screen.getByText(/ordenar/i);
    expect(element).toBeInTheDocument();
  });

  test('se existe a palavra Operador', () => {
    render(<App />);

    const element = screen.getByText(/operador/i);
    expect(element).toBeInTheDocument();
  });

  test('se existe a opção de ordenar por ordem ascendente e descendente', async () => {
    render(<App />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const elementAsc = screen.getByText(/ascendente/i);
    expect(elementAsc).toBeInTheDocument();

    const elementDes = screen.getByText(/descendente/i);
    expect(elementDes).toBeInTheDocument();

  });

  test('se existe um input de comparação', () => {
    render(<App />);
    const comparisonColumn = screen.getByTestId('comparison-filter');

    userEvent.type(comparisonColumn, 'maior que');
    userEvent.type(comparisonColumn, 'menor que');
    userEvent.type(comparisonColumn, 'igual a');
  });

  test('se a página possui os testId', () => {
    render(<App />);

    const filterName = screen.getByTestId('name-filter');
    const filterColumn = screen.getByTestId('column-filter');
    const filterComparison = screen.getByTestId('comparison-filter');
    const filterValue = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    expect(filterName).toBeInTheDocument();
    expect(filterColumn).toBeInTheDocument();
    expect(filterComparison).toBeInTheDocument();
    expect(filterValue).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();
  });

  test('se o comparison funciona', async () => {
    await act(async () => {
      render(<App />);
    })

    const filterComparison = screen.getByTestId('comparison-filter');
    const filterValue = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    userEvent.selectOptions(filterComparison, "maior que")
    userEvent.type(filterValue, "2000")
    userEvent.click(filterButton)

    userEvent.selectOptions(filterComparison, "menor que")
    userEvent.type(filterValue, "100")
    userEvent.click(filterButton)

    userEvent.selectOptions(filterComparison, "igual a")
    userEvent.type(filterValue, "3700")
    userEvent.click(filterButton)
  })

  test('se o filtro é excluido', async () => {
    await act(async () => {
      render(<App />);
    })

    const filterComparison = screen.getByTestId('comparison-filter');
    const filterValue = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');
    // const btnClear = screen.getByRole('button', { name: /remove todos os filtros/i })

    userEvent.selectOptions(filterComparison, "maior que")
    userEvent.type(filterValue, "2000")
    userEvent.click(filterButton)

    userEvent.selectOptions(filterComparison, "menor que")
    userEvent.type(filterValue, "100")
    userEvent.click(filterButton)

    // const buttonClear = screen.getByRole('button', { name: /x/i })

    // userEvent.click(buttonClear[0])
    // userEvent.click(btnClear)
  })
})
