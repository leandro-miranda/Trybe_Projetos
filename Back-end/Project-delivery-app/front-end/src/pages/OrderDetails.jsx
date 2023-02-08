import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getSaleById, updateSaleStatus } from '../api/sales';
import Navbar from '../components/Navbar';
import './OrderDetails.css';

function CustomerOrderDetails() {
  const [path, setPath] = useState('');
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const [order, setOrder] = useState({ products: [] });
  const mgNum = 10;
  const label = `${path}_order_details__element-order-details-label-`;
  const detail = `${path}_order_details__element-order-table-`;
  const fields = ['Item', 'Description', 'Quantity', 'Value', 'Sub-total'];

  const fetchData = async () => {
    const { data } = await getSaleById(id);

    setOrder(data);
  };

  useEffect(() => {
    fetchData();

    setPath(pathname.includes('customer') ? 'customer' : 'seller');
  }, []);

  const handleUpdateOrder = async (status) => {
    await updateSaleStatus(id, status);
    await fetchData();
  };

  return (
    <div
      className="details-box"
    >
      <Navbar />
      <h2>Detalhes do pedido</h2>
      <div
        className="vamov"
      >
        {
          order.id !== undefined && (
            <>
              <p
                className="pedido"
                data-testid={ `${label}order-id` }
              >
                {' '}
                Pedido
                {' '}
                {order.id}
              </p>
              <p
                className="nome"
                data-testid={ `${label}seller-name` }
              >
                {order.seller.name}

              </p>
              <p
                className="datinha"
                data-testid={ `${label}order-date` }
              >
                {
                  new Date(order.saleDate)
                    .toLocaleString('pt-BR')
                    .slice(0, mgNum)
                }
              </p>
              <p
                className="status"
                data-testid={ `${label}delivery-status` }
              >
                {order.status}

              </p>
              <p
                className="precin"
                data-testid={ `${path}_order_details__element-order-total-price` }
              >
                {' '}
                Total: R$
                { String(order.totalPrice).replace('.', ',') }
              </p>
            </>
          )
        }
      </div>

      <table>
        <thead>
          <tr>
            {fields.map((i, j) => (<th key={ j }>{i}</th>))}
          </tr>
        </thead>
        <tbody>
          {order.products.map((product, index) => (
            <tr key={ `product-order-${index}` }>
              <td
                className="primary"
                data-testid={ `${detail}item-number-${index}` }
              >
                {index + 1}

              </td>
              <td
                className="description"
                data-testid={ `${detail}name-${index}` }
              >
                {product.name}

              </td>
              <td
                className="secondary"
                data-testid={ `${detail}table-quantity-${index}` }
              >
                {product.SaleProduct.quantity}
              </td>
              <td
                className="tertiary"
                data-testid={ `${detail}table-unit-price-${index}` }
              >
                {(product.price).replace('.', ',')}
              </td>
              <td
                className="quartenary-det"
                data-testid={ `${detail}table-sub-total-${index}` }
              >
                {
                  (product.price * product.SaleProduct.quantity)
                    .toFixed(2)
                    .replace('.', ',')
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        path === 'seller' ? (
          <>
            <button
              className="status-preparando"
              data-testid="seller_order_details__button-preparing-check"
              type="button"
              disabled={ order.status !== 'Pendente' }
              onClick={ () => handleUpdateOrder('Preparando') }
            >
              PREPARAR PEDIDO
            </button>
            <button
              className="status-inRota"
              data-testid="seller_order_details__button-dispatch-check"
              type="button"
              disabled={ order.status !== 'Preparando' }
              onClick={ () => handleUpdateOrder('Em Trânsito') }
            >
              SAIU PARA ENTREGA
            </button>
          </>
        ) : (
          <button
            className="status-entregue"
            type="button"
            data-testid="customer_order_details__button-delivery-check"
            disabled={ order.status !== 'Em Trânsito' }
            onClick={ () => handleUpdateOrder('Entregue') }
          >
            MARCAR COMO ENTREGUE
          </button>
        )
      }
    </div>
  );
}

export default CustomerOrderDetails;
