import { Request, Response } from 'express';
import { BankOperationModel } from '../models/BankOperation';

export class BankOperationController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await BankOperationModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all bankoperation error:', error);
      res.status(500).json({ error: 'Failed to fetch bankoperation' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await BankOperationModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'BankOperation not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get bankoperation by id error:', error);
      res.status(500).json({ error: 'Failed to fetch bankoperation' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await BankOperationModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create bankoperation error:', error);
      res.status(500).json({ error: 'Failed to create bankoperation' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await BankOperationModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'BankOperation not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update bankoperation error:', error);
      res.status(500).json({ error: 'Failed to update bankoperation' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await BankOperationModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'BankOperation not found' });
        return;
      }

      res.json({ message: 'BankOperation deleted successfully' });
    } catch (error) {
      console.error('Delete bankoperation error:', error);
      res.status(500).json({ error: 'Failed to delete bankoperation' });
    }
  }
}
