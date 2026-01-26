import { Request, Response } from 'express';
import { TransactionModel } from '../models/Transaction';

export class TransactionController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await TransactionModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all transaction error:', error);
      res.status(500).json({ error: 'Failed to fetch transaction' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await TransactionModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'Transaction not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get transaction by id error:', error);
      res.status(500).json({ error: 'Failed to fetch transaction' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await TransactionModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create transaction error:', error);
      res.status(500).json({ error: 'Failed to create transaction' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await TransactionModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'Transaction not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update transaction error:', error);
      res.status(500).json({ error: 'Failed to update transaction' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await TransactionModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'Transaction not found' });
        return;
      }

      res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      console.error('Delete transaction error:', error);
      res.status(500).json({ error: 'Failed to delete transaction' });
    }
  }
}
