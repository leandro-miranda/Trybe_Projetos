import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../services/user.service';

const JWT_SECRET = 'secret';
export default class UserController {
  constructor(private userService = new UserService()) { }

  public async createUser(req: Request, res: Response): Promise<void> {
    const { body } = req;

    const token = jwt.sign({ body }, JWT_SECRET, { expiresIn: '7d' });

    await this.userService.createUser(body);

    res.status(201).json({ token });
  }
}