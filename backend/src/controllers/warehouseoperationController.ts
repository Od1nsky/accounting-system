import { Request, Response } from 'express';
import { WarehouseOperationModel } from '../models/WarehouseOperation';

export class WarehouseOperationController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await WarehouseOperationModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all warehouseoperation error:', error);
      res.status(500).json({ error: 'Failed to fetch warehouseoperation' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await WarehouseOperationModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'WarehouseOperation not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get warehouseoperation by id error:', error);
      res.status(500).json({ error: 'Failed to fetch warehouseoperation' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await WarehouseOperationModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create warehouseoperation error:', error);
      res.status(500).json({ error: 'Failed to create warehouseoperation' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await WarehouseOperationModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'WarehouseOperation not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update warehouseoperation error:', error);
      res.status(500).json({ error: 'Failed to update warehouseoperation' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await WarehouseOperationModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'WarehouseOperation not found' });
        return;
      }

      res.json({ message: 'WarehouseOperation deleted successfully' });
    } catch (error) {
      console.error('Delete warehouseoperation error:', error);
      res.status(500).json({ error: 'Failed to delete warehouseoperation' });
    }
  }
}
