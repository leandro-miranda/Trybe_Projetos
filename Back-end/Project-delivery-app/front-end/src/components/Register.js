import { validate } from 'email-validator';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import register from '../api/register';
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);
  const functions = [setName, setEmail, setPassword];
  const prefix = 'common_register__';
  const history = useHistory();

  const enabled = () => {
    const len = { name: 12, password: 6 };
    return validate(email) && name.length >= len.name && password.length >= len.password;
  };

  const createInput = (arg, index) => (
    <input
      key={ `input-${index}` }
      className="inpute"
      type="text"
      placeholder={ `Escreva seu ${arg}` }
      data-testid={ `${prefix}input-${arg}` }
      onChange={ ({ target }) => functions[index](target.value) }
    />);

  const validateRegister = async (newPost) => {
    const sucess = 201;
    const invalidError = 409;
    const newPostRegister = await register(newPost);
    if (newPostRegister.status === invalidError) {
      setInvalid(true);
    }
    if (newPostRegister.status === sucess) {
      const data = JSON.stringify(newPostRegister.data);
      localStorage.setItem('user', data);
      history.push('/customer/products');
    }
  };

  return (
    <>
      <div
        className="register-box"
      >
        <p>Cadastro</p>
        {['name', 'email', 'password'].map((arg, index) => createInput(arg, index))}
        <button
          className="botao"
          type="button"
          data-testid={ `${prefix}button-register` }
          onClick={ () => validateRegister({ name, email, password }) }
          disabled={ !enabled() }
        >
          Cadastrar
        </button>
      </div>
      {
        invalid && (
          <div data-testid={ `${prefix}element-invalid_register` }>
            Registro inválido
          </div>
        )
      }
    </>
  );
}

export default Register;
