import express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/error.middleware';
import productRoutes from './routes/products.routes';
import userRoutes from './routes/user.routes';
import orderRoutes from './routes/orders.routes';
import loginRoutes from './routes/login.routes';

const app = express();

app.use(express.json());

app.use(loginRoutes);

app.use(productRoutes);

app.use(userRoutes);

app.use(orderRoutes);

app.use(errorMiddleware);

export default app;
