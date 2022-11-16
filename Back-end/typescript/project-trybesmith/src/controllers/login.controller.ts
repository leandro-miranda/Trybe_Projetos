import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import LoginService from '../services/login.service';

const JWT_SECRET = 'secret';

export default class ValidateLogin {
  constructor(private loginService = new LoginService()) {}

  public login = async (req: Request, res: Response) => {
    const login = req.body;
    await this.loginService.login(login);

    const token = jwt.sign({ login }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({ token });
  };
}