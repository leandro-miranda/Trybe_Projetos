import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import ProductMiddleware from '../middlewares/product.middleware';
import AmountMiddleware from '../middlewares/amount.middleware';

const router = Router();

const productController = new ProductController();
const productMiddleware = new ProductMiddleware();
const amountMiddleware = new AmountMiddleware();

router.post(
  '/products', 
  productMiddleware.product, 
  amountMiddleware.amount,
  (req, res) => productController.createProduct(req, res),
);
router.get('/products', (req, res) => productController.getAllProducts(req, res));

export default router;
