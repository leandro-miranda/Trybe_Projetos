import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import IProduct from '../interfaces/product.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async createProduct(name: string, amount: string): Promise<IProduct> {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );

    return { id: insertId, name, amount };
  }

  public async getAllProducts(): Promise<IProduct[]> {
    const [products] = await this.connection.execute<(IProduct & RowDataPacket)[]>(
      'SELECT * FROM Trybesmith.Products');

    return products;
  }

  public async updateProducts(
    orderId: number,
    productId: number,
  ): Promise<number | boolean> {
    const [result] = await this.connection.execute<ResultSetHeader>(
      'UPDATE Trybesmith.Products SET orderId=? WHERE id=?',
      [orderId, productId],
    );
    const { affectedRows } = result;
    if (affectedRows > 0) return affectedRows;
    return false;
  }
}