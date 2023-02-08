import { validate } from 'email-validator';
import React, { useState } from 'react';
import { fetchAdmin, postAdmin, deleteUser } from '../api/admin';

function Admin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState('customer');
  const [invalid, setInvalid] = useState(false);

  const functions = [setName, setEmail, setPassword];
  const prefix = 'admin_manage__';
  const affix = 'element-user-table-';
  const userExists = 'admin_manage__element-invalid-register';
  const elements = ['input-name', 'input-email', 'input-password'];
  const fields = ['item-number', 'name', 'email', 'role', 'remove'];
  const keys = ['id', 'name', 'email', 'role', ''];

  const enabled = () => {
    const len = { name: 12, password: 6 };
    return validate(email) && name.length >= len.name && password.length >= len.password;
  };

  const createInput = (arg, index) => (
    <input
      key={ index }
      type={ `${arg}` }
      placeholder={ `Type your ${arg}` }
      data-testid={ `${prefix}${arg}` }
      onChange={ ({ target }) => functions[index](target.value) }
    />);

  const printUsers = async () => {
    const { data } = await fetchAdmin();
    console.log(users);
    setUsers(data);
  };

  const optionsImplementation = (i) => (
    <option
      key={ i }
      value={ i }
    >
      {i}
    </option>
  );

  const validatePost = async () => {
    const conflict = 409;
    const response = await postAdmin({ name, email, password, role });
    if (response.status === conflict) {
      setInvalid(true);
    }
    const { data } = await fetchAdmin();
    setUsers(data);
  };

  const remove = async (index) => {
    setUsers(users.filter((_, j) => j !== index));
    await deleteUser(users[index].email);
  };

  return (
    <>
      <div>Admin</div>
      {elements.map((arg, index) => createInput(arg, index))}

      <select
        data-testid={ `${prefix}select-role` }
        value={ role }
        onChange={ ({ target }) => setRole(target.value) }
      >
        {['customer', 'seller', 'administrator'].map((i) => optionsImplementation(i))}
      </select>

      <button
        type="button"
        data-testid={ `${prefix}button-register` }
        disabled={ !enabled() }
        onClick={ () => validatePost() }
      >
        Register
      </button>
      <button
        type="button"
        onClick={ () => printUsers() }
      >
        Get All Users
      </button>

      {invalid && (
        <div data-testid={ `${userExists}` }>User already exists</div>)}
      <table>
        <thead>
          <tr>
            {fields.map((i, j) => (
              <th key={ j } data-testid={ `${prefix}${affix}${i}-` }>{i}</th>))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={ index }>
              {fields.map((i, j) => (
                <>
                  <td key={ j } data-testid={ `${prefix}${affix}${i}-${index}` }>
                    {user[keys[j]]}
                  </td>
                  {j === fields.length - 1 && (
                    <td>
                      <button
                        type="button"
                        data-testid={ `${prefix}${affix}remove-${user.id - 1}` }
                        onClick={ () => remove(index) }
                      >
                        Remover
                      </button>
                    </td>
                  )}
                </>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Admin;
