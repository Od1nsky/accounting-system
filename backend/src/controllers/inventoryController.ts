import { Request, Response } from 'express';
import { InventoryModel } from '../models/Inventory';

export class InventoryController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await InventoryModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all inventory error:', error);
      res.status(500).json({ error: 'Failed to fetch inventory' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await InventoryModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'Inventory not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get inventory by id error:', error);
      res.status(500).json({ error: 'Failed to fetch inventory' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await InventoryModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create inventory error:', error);
      res.status(500).json({ error: 'Failed to create inventory' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await InventoryModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'Inventory not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update inventory error:', error);
      res.status(500).json({ error: 'Failed to update inventory' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await InventoryModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'Inventory not found' });
        return;
      }

      res.json({ message: 'Inventory deleted successfully' });
    } catch (error) {
      console.error('Delete inventory error:', error);
      res.status(500).json({ error: 'Failed to delete inventory' });
    }
  }
}
