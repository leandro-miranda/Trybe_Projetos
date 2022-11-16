import connection from '../models/connection';
import OrderModel from '../models/orders.model';
import ProductModel from '../models/product.model';
import IOrder from '../interfaces/order.interface';

export default class OrderService {
  public orderModel: OrderModel;

  public productModel: ProductModel;

  constructor() {
    this.orderModel = new OrderModel(connection);
    this.productModel = new ProductModel(connection);
  }

  public async getAllOrders(): Promise<IOrder[]> {
    return this.orderModel.getAllOrders();
  }

  public async createOrder(userId: number, productsIds: number[]): Promise<IOrder> {
    const orderId: number = await this.orderModel.createOrder(userId);
    const insertId = productsIds.map(async (productId) => {
      await this.productModel.updateProducts(orderId, productId);
    });
    await Promise.all(insertId);

    return { userId, productsIds };
  }
}