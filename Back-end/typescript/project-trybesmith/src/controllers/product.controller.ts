import { Request, Response } from 'express';
import ProductService from '../services/product.service';

export default class ProductController {
  constructor(private productService = new ProductService()) { }

  public async createProduct(req: Request, res: Response): Promise<void> {
    const { name, amount } = req.body;
    const createdProduct = await this.productService.createProduct(name, amount);
    
    res.status(201).json(createdProduct);
  }

  public async getAllProducts(req: Request, res: Response): Promise<void> {
    const products = await this.productService.getAllProducts();

    res.status(200).json(products);
  }
}