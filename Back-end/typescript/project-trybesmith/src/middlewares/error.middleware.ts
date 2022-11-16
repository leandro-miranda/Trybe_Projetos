import { Request, Response, NextFunction } from 'express';

export default (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.log(error);

  return res.status(500).json({ error });
};