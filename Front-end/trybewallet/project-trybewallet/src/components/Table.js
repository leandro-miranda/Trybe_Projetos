import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpenses } from '../redux/actions';

class Table extends Component {
  render() {
    const { expensesTable, removeExpense } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expensesTable.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>{(expense.exchangeRates[expense.currency].name)}</td>
              <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>
                {Number(expense.value
                  * expense.exchangeRates[expense.currency].ask).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  onClick={ () => removeExpense(expense.id) }
                  data-testid="delete-btn"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    );
  }
}

Table.propTypes = {
  expensesTable: PropTypes.arrayOf(PropTypes.object),
  removeExpense: PropTypes.func.isRequired,
};

Table.defaultProps = {
  expensesTable: {},
};

const mapStateToProps = (store) => ({
  expensesTable: store.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (item) => dispatch(removeExpenses(item)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Table);
