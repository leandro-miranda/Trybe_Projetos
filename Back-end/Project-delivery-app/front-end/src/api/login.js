import API from './config';

const postLogin = async (newLogin) => {
  try {
    const response = await API.post('/login', newLogin);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export { postLogin, API };
