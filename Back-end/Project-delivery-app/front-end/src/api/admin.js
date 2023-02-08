import API from './config';

API.interceptors.request.use((req) => {
  if (localStorage.getItem('admin')) {
    req.headers.Authorization = `${JSON.parse(localStorage.getItem('admin')).token}`;
  }
  return req;
});

const fetchAdmin = async () => {
  try {
    const response = await API.get('/admin');
    return response;
  } catch (error) {
    return error.reponse;
  }
};

const postAdmin = async (newUser) => {
  try {
    const response = await API.post('/admin', newUser);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

const deleteUser = async (email) => {
  try {
    await API.delete(`/admin/${email}`);
  } catch (error) {
    console.log(error.stack);
    return error.response;
  }
};

export { fetchAdmin, postAdmin, deleteUser };
