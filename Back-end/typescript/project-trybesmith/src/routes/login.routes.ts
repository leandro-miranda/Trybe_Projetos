import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import LoginMiddleware from '../middlewares/login.middleware';

const router = Router();

const loginController = new LoginController();
const loginMiddleware = new LoginMiddleware();

router.post('/login', loginMiddleware.login, loginController.login);

export default router;