import getApi from '../../services/getApi';

export const LOGIN_EMAIL = 'LOGIN';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const REMOVE_EXPENSES = 'REMOVE_EXPENSES';
export const CURRENCIES = 'CURRENCIES';

export const loginEmail = (email) => ({
  type: LOGIN_EMAIL,
  email,
});

export const currencies = (typeCurrencies, currenciesAll) => ({
  type: CURRENCIES,
  typeCurrencies,
  currenciesAll,
});

export const saveExpenses = (payload) => ({
  type: SAVE_EXPENSES,
  payload,
});

export const removeExpenses = (item) => ({
  type: REMOVE_EXPENSES,
  item,
});

export const fetchAPI = () => async (dispatch) => {
  const response = await getApi();
  const getCurrencies = Object.keys(response);
  dispatch(currencies(getCurrencies, response));
};
