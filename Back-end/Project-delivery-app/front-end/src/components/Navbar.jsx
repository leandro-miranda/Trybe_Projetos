import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './NavBar.css';

function Navbar() {
  const { location: { pathname } } = useHistory();
  const [user, setUser] = useState({});
  const [path, setPath] = useState('');
  const prefix = 'customer_products__';
  const history = useHistory();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));

    setUser(userData);

    setPath(pathname.includes('customer') ? 'customer' : 'seller');
  }, []);

  const handleExit = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  const navigateToOrder = () => {
    history.push(`/${path}/orders`);
  };

  return (
    <header>
      <nav>
        <div className="one-nav">
          <button
            className="product-button"
            type="button"
            data-testid={ `${prefix}element-navbar-link-products` }
          >
            Produtos
          </button>
          <button
            className="pedidos-button"
            type="button"
            data-testid={ `${prefix}element-navbar-link-orders` }
            onClick={ navigateToOrder }
          >
            Meus Pedidos
          </button>
        </div>
        <div
          className="two-nav"
        >
          <p
            className="user-data"
            data-testid={ `${prefix}element-navbar-user-full-name` }
          >
            { user.name }

          </p>
          <button
            className="out-button"
            type="button"
            data-testid={ `${prefix}element-navbar-link-logout` }
            onClick={ handleExit }
          >
            Sair
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
