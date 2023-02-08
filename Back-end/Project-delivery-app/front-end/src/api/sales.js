import API from './config';

const registerSale = async (newSale, token) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await API.post('/sales', newSale, config);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

const getAllSales = async () => {
  try {
    const response = await API.get('/sales');
    return response;
  } catch (error) {
    return error.response.data;
  }
};

const getSaleById = async (id) => {
  try {
    const response = await API.get(`/sales/${id}`);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

const updateSaleStatus = async (id, status) => {
  try {
    const response = await API.put(`/sales/${id}`, { status });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export { registerSale, getSaleById, getAllSales, updateSaleStatus };
