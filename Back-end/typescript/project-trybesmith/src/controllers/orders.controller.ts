import { Request, Response } from 'express';
import OrderService from '../services/orders.service';

export default class OrderController {
  constructor(private orderService = new OrderService()) { }

  public async getAllOrders(req: Request, res: Response): Promise<void> {
    const orders = await this.orderService.getAllOrders();

    res.status(200).json(orders);
  }

  public async createOrder(req: Request, res: Response): Promise<void> {
    const { productsIds, user } = req.body;
    // console.log({ productsIds, user });
    const userId = user.id;
    
    const createdOrder = await this.orderService.createOrder(userId, productsIds);
    res.status(201).json(createdOrder);
  }
}