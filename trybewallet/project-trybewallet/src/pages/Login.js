import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginEmail } from '../redux/actions/index';
import '../styles/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  validationEmail = (email) => /\S+@\S+\.\S+/.test(email)

  handleClickSubmit = (event) => {
    const { history, loginStore } = this.props;
    const { email } = this.state;

    loginStore(email);
    event.preventDefault();
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    const passwordNumber = 6;
    return (
      <div className="container">
        <h1 className="title">TrybeWallet</h1>
        <form>
          <input
            className="emailInput"
            type="email"
            name="email"
            value={ email }
            placeholder="Digite seu email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
          <input
            className="senhaInput"
            type="password"
            name="password"
            value={ password }
            placeholder="Digite sua senha"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
          <button
            className="buttonInput"
            type="button"
            onClick={ this.handleClickSubmit }
            disabled={
              !(this.validationEmail(email)
            && password.length >= passwordNumber)
            }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loginStore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loginStore: (email) => dispatch(loginEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
