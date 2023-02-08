import API from './config';

const getAllProducts = async () => {
  try {
    const response = await API.get('/customer/products');
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

const getProduct = () => {};

export { getAllProducts, getProduct };
