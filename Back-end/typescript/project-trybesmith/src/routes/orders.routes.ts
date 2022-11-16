import { Router } from 'express';
import OrderController from '../controllers/orders.controller';
import OrderMiddleware from '../middlewares/order.middleware';
import validateToken from '../middlewares/token.middleware';

const router = Router();

const orderController = new OrderController();
const orderMiddleware = new OrderMiddleware();
const validateTokenMiddleware = validateToken;

router.post(
  '/orders', 
  validateTokenMiddleware, 
  orderMiddleware.validateProductId, 
  orderController.createOrder,
);
router.get('/orders', (req, res) => orderController.getAllOrders(req, res));

export default router;