import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/login.service';

class LoginMiddleware {
  constructor(private loginService = new LoginService()) {}

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const userLogin = req.body;
    const { username, password } = userLogin;
  
    if (!username) return res.status(400).json({ message: '"username" is required' });
    if (!password) return res.status(400).json({ message: '"password" is required' });

    const result = await this.loginService.login(userLogin);

    if (result.length === 0) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }

    next();
  };
}

export default LoginMiddleware;