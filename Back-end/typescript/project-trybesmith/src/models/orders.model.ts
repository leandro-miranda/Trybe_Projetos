import { Pool, ResultSetHeader } from 'mysql2/promise';
import IOrder from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAllOrders(): Promise<IOrder[]> {
    const [orders] = await this.connection.execute<IOrder[] & ResultSetHeader>(
      `SELECT ord.id, ord.userId, JSON_ARRAYAGG(product.id) AS productsIds
       FROM Trybesmith.Orders AS ord
       INNER JOIN Trybesmith.Products AS product
       ON product.orderId = ord.id
       GROUP BY ord.id;`,
    );
    
    return orders;
  }

  public async createOrder(userId: number): Promise<number> {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUE (?);',
      [userId],
    );
    console.log(insertId);
      
    return insertId;
  }
}