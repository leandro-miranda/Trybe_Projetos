import { Request, Response, NextFunction } from 'express';

class UsernameMiddleware {
  public username = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;

    if (!username) return res.status(400).json({ message: '"username" is required' });
    if (username.length < 3) {
      return res.status(422)
        .json({ message: '"username" length must be at least 3 characters long' });
    }
    if (typeof username !== 'string') {
      return res.status(422).json({ message: '"username" must be a string' });
    }
    next();
  };
}

export default UsernameMiddleware;