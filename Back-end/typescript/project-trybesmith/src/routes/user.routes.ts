import { Router } from 'express';
import UserController from '../controllers/users.controller';
import UsernameMiddleware from '../middlewares/username.middleware';
import ClasseMiddleware from '../middlewares/classe.middleware';
import LevelMiddleware from '../middlewares/level.middleware';
import PasswordMiddleware from '../middlewares/password.middleware';
  
const router = Router();

const userController = new UserController();
const usernameMiddleware = new UsernameMiddleware();
const classeMiddleware = new ClasseMiddleware();
const levelMiddleware = new LevelMiddleware();
const passwordMiddleware = new PasswordMiddleware();

router.post(
  '/users', 
  usernameMiddleware.username, 
  classeMiddleware.classe, 
  levelMiddleware.level, 
  passwordMiddleware.password, 
  (req, res) => userController.createUser(req, res),
);

export default router;
