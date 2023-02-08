import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Home() {
  const history = useHistory();
  useEffect(() => {
    const validateLogin = async () => {
      const user = await JSON.parse(localStorage.getItem('user'));
      const admin = localStorage.getItem('admin');

      if (!user && !admin) {
        history.push('/login');
      } else {
        if (admin) {
          history.push('/admin/manage');
        }

        if (user.role === 'seller') {
          history.push('/seller/orders');
        }

        if (user.role === 'customer') {
          history.push('/customer/products');
        }
      }
    };
    validateLogin();
  }, [history]);
  return (<div>Home</div>);
}
