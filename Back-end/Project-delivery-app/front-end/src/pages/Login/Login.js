import { validate } from 'email-validator';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postLogin } from '../../api/login';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);

  const functions = [setEmail, setPassword];
  const prefix = 'common_login__';
  const minLength = 6;
  const history = useHistory();

  const dispatch = useDispatch();
  const enabled = () => validate(email) && password.length >= minLength;

  if (localStorage.getItem('user')) {
    history.push('/customer/products');
  }

  const validateLogin = async (newPost) => {
    dispatch({ type: 'EMAIL', email });

    // const status = { sucess: 200, notFound: 404 };
    const newPostLogin = await postLogin(newPost);
    const data = JSON.stringify(newPostLogin.data);

    if (newPostLogin.data.message === 'Not found') {
      setInvalid(true);
    }

    if (newPostLogin.data.role === 'seller') {
      localStorage.setItem('user', data);
      history.push('/seller/orders');
    }

    if (newPostLogin.data.role === 'administrator') {
      localStorage.setItem('admin', data);
      const username = JSON.parse(localStorage.getItem('admin')).name;
      dispatch({ type: 'NAME', name: username });
      history.push('/admin/manage');
    }

    if (newPostLogin.data.role === 'customer') {
      localStorage.setItem('user', data);
      const username = JSON.parse(localStorage.getItem('user')).name;
      dispatch({ type: 'NAME', name: username });
      history.push('/customer/products');
    }
  };

  const createInput = (arg, index) => (
    <input
      key={ `input-${index}` }
      className="user-box"
      placeholder={ `Type your ${arg}` }
      data-testid={ `${prefix}input-${arg}` }
      onChange={ ({ target }) => functions[index](target.value) }
    />);

  return (
    <div className="login-box">
      {['email', 'password'].map((arg, index) => createInput(arg, index))}
      <button
        className="btn__submit"
        type="button"
        data-testid={ `${prefix}button-login` }
        disabled={ !enabled() }
        onClick={ () => validateLogin({ email, password }) }
      >
        Login
      </button>
      <button
        className="btn__submit-register"
        type="button"
        data-testid={ `${prefix}button-register` }
        onClick={ () => history.push('/register') }
      >
        Ainda não tenho conta
      </button>
      {
        invalid && (
          <div
            className="btn__submit-invalid"
            data-testid={ `${prefix}element-invalid-email` }
          >
            Dados inválidos
          </div>
        )
      }
    </div>
  );
}

export default Login;
