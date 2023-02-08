import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { registerSale } from '../../api/sales';
import getAllSellers from '../../api/sellers';
import Navbar from '../../components/Navbar';

export default function Checkout() {
  const [product, setProduct] = useState(JSON.parse(localStorage.getItem('cart')));
  const [selectedSeller, setSelectedSeller] = useState(2);
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [sellers, setSellers] = useState([{ name: '' }]);
  const [total, setTotal] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSellers = async () => {
      const { data } = await getAllSellers();

      setSellers(data);
    };

    fetchSellers();
  }, []);

  const calcPrice = () => {
    const price = product.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    dispatch({ type: 'TOTALPRICE', totalPrice: price.toFixed(2) });
    setTotal(price.toFixed(2));
  };

  useEffect(() => { calcPrice(); }, [product]);

  const removeItem = (item) => {
    const filtredData = product.filter((e) => e.id !== item.id);

    localStorage.setItem('cart', JSON.stringify(filtredData));
    dispatch({ type: 'CART', cart: filtredData });

    setProduct(filtredData);

    calcPrice();
  };

  const handleClick = async () => {
    const newSale = {
      sellerId: Number(selectedSeller),
      totalPrice: total,
      deliveryAddress: address,
      deliveryNumber: addressNumber,
      saleDate: new Date(),
    };

    const products = product.map((item) => (
      { productId: item.id, quantity: item.quantity }
    ));

    const user = await JSON.parse(localStorage.getItem('user'));

    const { data: { saleId } } = await registerSale(
      { sale: newSale, products },
      user.token,
    );

    history.push(`/customer/orders/${saleId}`);
  };

  return (
    <>
      <Navbar />
      <table>
        <thead>
          <tr>
            <th>itemNumber</th>
            <th>name</th>
            <th>quantity</th>
            <th>unitPrice</th>
            <th>subTotal</th>
            <th>remove</th>
          </tr>
        </thead>
        <tbody>
          {
            product.map((element, index) => (
              <tr key={ element.id }>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-name-${index}`
                  }
                >
                  {element.name}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                >
                  {element.quantity}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  {element.price.replace('.', ',')}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  {
                    (element.quantity * element.price)
                      .toFixed(2)
                      .replace('.', ',')
                  }
                </td>
                <td>
                  <button
                    type="button"
                    onClick={ () => removeItem(element) }
                    data-testid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <p
        data-testid="customer_checkout__element-order-total-price"
      >
        {String(total).replace('.', ',')}
      </p>
      <select
        data-testid="customer_checkout__select-seller"
        value={ selectedSeller === '' ? sellers[0].name : selectedSeller }
        onClick={ ({ target }) => setSelectedSeller(target.value) }
      >
        {
          sellers.map(
            (seller, index) => (
              <option
                value={ seller.id }
                key={ index }
              >
                { seller.name }
              </option>
            ),
          )
        }

      </select>
      <input
        type="text"
        placeholder="address"
        data-testid="customer_checkout__input-address"
        value={ address }
        onChange={ ({ target }) => setAddress(target.value) }
      />
      <input
        type="text"
        placeholder="number"
        data-testid="customer_checkout__input-address-number"
        value={ addressNumber }
        onChange={ ({ target }) => setAddressNumber(target.value) }
      />
      <button
        data-testid="customer_checkout__button-submit-order"
        type="submit"
        onClick={ handleClick }
      >
        Submit
      </button>
    </>
  );
}
