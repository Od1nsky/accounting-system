import { Request, Response } from 'express';
import { DepreciationModel } from '../models/Depreciation';

export class DepreciationController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await DepreciationModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all depreciation error:', error);
      res.status(500).json({ error: 'Failed to fetch depreciation' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await DepreciationModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'Depreciation not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get depreciation by id error:', error);
      res.status(500).json({ error: 'Failed to fetch depreciation' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await DepreciationModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create depreciation error:', error);
      res.status(500).json({ error: 'Failed to create depreciation' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await DepreciationModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'Depreciation not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update depreciation error:', error);
      res.status(500).json({ error: 'Failed to update depreciation' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await DepreciationModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'Depreciation not found' });
        return;
      }

      res.json({ message: 'Depreciation deleted successfully' });
    } catch (error) {
      console.error('Delete depreciation error:', error);
      res.status(500).json({ error: 'Failed to delete depreciation' });
    }
  }
}
