import { CURRENCIES, SAVE_EXPENSES, REMOVE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
  allExchange: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    return {
      ...state,
      currencies: action.typeCurrencies,
      allExchange: action.currenciesAll,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { ...action.payload, id: state.expenses.length },
      ],

    };
  case REMOVE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.item),
    };
  default:
    return state;
  }
};

export default wallet;
