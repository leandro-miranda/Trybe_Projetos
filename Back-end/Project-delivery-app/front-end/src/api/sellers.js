import API from './config';

const getAllSellers = async () => {
  try {
    const response = await API.get('/sellers');
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export default getAllSellers;
