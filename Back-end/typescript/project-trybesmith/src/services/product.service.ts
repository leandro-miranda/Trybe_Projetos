import connection from '../models/connection';
import ProductModel from '../models/product.model';
import IProduct from '../interfaces/product.interface';

export default class ProductService {
  public productModel: ProductModel;

  constructor() {
    this.productModel = new ProductModel(connection);
  }

  public async createProduct(name: string, amount: string): Promise<IProduct> {
    return this.productModel.createProduct(name, amount);
  }

  public async getAllProducts(): Promise<IProduct[]> {
    return this.productModel.getAllProducts();
  }
}
