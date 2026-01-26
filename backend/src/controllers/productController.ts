import { Request, Response } from 'express';
import { ProductModel } from '../models/Product';

export class ProductController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await ProductModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all product error:', error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await ProductModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get product by id error:', error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await ProductModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create product error:', error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await ProductModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update product error:', error);
      res.status(500).json({ error: 'Failed to update product' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await ProductModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Delete product error:', error);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  }
}
