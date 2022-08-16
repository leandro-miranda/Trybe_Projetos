import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, valueTotal } = this.props;

    const totalExpenses = Number(valueTotal.reduce(
      (acc, { value, exchangeRates, currency }) => acc
      + (value
        * exchangeRates[currency].ask),
      0,
    )).toFixed(2);

    return (
      <header>
        <h2>Wallet</h2>
        <h5 data-testid="email-field">
          { email }
        </h5>
        <h4 data-testid="total-field">
          {totalExpenses}
        </h4>
        <h4 data-testid="header-currency-field">
          BRL
        </h4>
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  valueTotal: store.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  valueTotal: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
