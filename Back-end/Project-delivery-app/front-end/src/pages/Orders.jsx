import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getAllSales } from '../api/sales';
import Navbar from '../components/Navbar';
import './Orders.css';

function CustomerOrders() {
  const [path, setPath] = useState('');
  const [sales, setSales] = useState([]);
  const { location: { pathname } } = useHistory();
  const prefix = `${path}_orders__element-`;
  const mgNum = 10;

  useEffect(() => {
    const fetchData = async () => {
      const salesData = await getAllSales();
      setSales(salesData.data);
    };

    fetchData();

    setPath(pathname.includes('customer') ? 'customer' : 'seller');
  }, []);

  return (
    <
    >
      <Navbar />

      <div className="sales">
        <h1>Aqui estão os seus pedidos:</h1>
        {
          sales.map((sale) => (
            <Link to={ `/${path}/orders/${sale.id}` } key={ `sale-${sale.id}` }>
              <div className="sale-card">
                <p
                  className="pedido-2"
                  data-testid={ `${prefix}order-id-${sale.id}` }
                >
                  Pedido:
                  {' '}
                  {sale.id}

                </p>
                <p
                  className="status-2"
                  data-testid={ `${prefix}delivery-status-${sale.id}` }
                >
                  {sale.status}

                </p>
                <p
                  className="data-2"
                  data-testid={
                    `${prefix}order-date-${sale.id}`
                  }
                >
                  {
                    new Date(sale.saleDate)
                      .toLocaleString('pt-BR')
                      .slice(0, mgNum)
                  }
                </p>

                <p
                  className="precin-2"
                  data-testid={ `${prefix}card-price-${sale.id}` }
                >
                  R$
                  {sale.totalPrice.replace('.', ',')}
                </p>
              </div>
            </Link>
          ))
        }
      </div>
    </>
  );
}

export default CustomerOrders;
