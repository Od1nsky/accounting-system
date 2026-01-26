import { Request, Response } from 'express';
import { ReconciliationModel } from '../models/Reconciliation';

export class ReconciliationController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await ReconciliationModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all reconciliation error:', error);
      res.status(500).json({ error: 'Failed to fetch reconciliation' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await ReconciliationModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'Reconciliation not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get reconciliation by id error:', error);
      res.status(500).json({ error: 'Failed to fetch reconciliation' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await ReconciliationModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create reconciliation error:', error);
      res.status(500).json({ error: 'Failed to create reconciliation' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await ReconciliationModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'Reconciliation not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update reconciliation error:', error);
      res.status(500).json({ error: 'Failed to update reconciliation' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await ReconciliationModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'Reconciliation not found' });
        return;
      }

      res.json({ message: 'Reconciliation deleted successfully' });
    } catch (error) {
      console.error('Delete reconciliation error:', error);
      res.status(500).json({ error: 'Failed to delete reconciliation' });
    }
  }
}
