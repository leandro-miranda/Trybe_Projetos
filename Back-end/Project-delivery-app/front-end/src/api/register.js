import API from './config';

const register = async (newUser) => {
  try {
    const response = await API.post('/register', newUser);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default register;
