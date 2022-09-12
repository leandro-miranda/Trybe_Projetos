import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, saveExpenses } from '../redux/actions';

const STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};
class WalletForm extends Component {
  constructor() {
    super();

    this.state = { ...STATE };
  }

  componentDidMount() {
    const { getFetchApi } = this.props;
    getFetchApi();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleBtnClick = (event) => {
    event.preventDefault();
    const { userExpenses, getFetchApi, exchangeRatesAll } = this.props;

    userExpenses({ ...this.state, exchangeRates: exchangeRatesAll });
    getFetchApi();
    this.setState({
      ...STATE,
    });
  }

  render() {
    const { allCurrencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor
            <input
              type="number"
              id="value"
              name="value"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              type="text"
              name="description"
              id="description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              name="currency"
              id="currency"
              value={ currency }
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              {allCurrencies.map((currencie) => (
                <option key={ currencie } value={ currencie }>
                  {currencie}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select
              name="method"
              id="method"
              value={ method }
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select
              name="tag"
              id="tag"
              value={ tag }
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="submit"
            onClick={ this.handleBtnClick }
          >
            Adicionar despesas
          </button>
        </form>
      </div>

    );
  }
}

WalletForm.propTypes = {
  getFetchApi: PropTypes.func.isRequired,
  allCurrencies: PropTypes.arrayOf(PropTypes.string),
  userExpenses: PropTypes.func.isRequired,
  exchangeRatesAll: PropTypes.objectOf(PropTypes.object),
};

WalletForm.defaultProps = {
  allCurrencies: [],
  exchangeRatesAll: {},
};

const mapStateToProps = (store) => ({
  allCurrencies: store.wallet.currencies,
  exchangeRatesAll: store.wallet.allExchange,

});

const mapDispatchToProps = (dispatch) => ({
  getFetchApi: () => dispatch(fetchAPI()),
  userExpenses: (expenses) => dispatch(saveExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
