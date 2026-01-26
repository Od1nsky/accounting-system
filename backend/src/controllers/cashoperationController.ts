import { Request, Response } from 'express';
import { CashOperationModel } from '../models/CashOperation';

export class CashOperationController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await CashOperationModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all cashoperation error:', error);
      res.status(500).json({ error: 'Failed to fetch cashoperation' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await CashOperationModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'CashOperation not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get cashoperation by id error:', error);
      res.status(500).json({ error: 'Failed to fetch cashoperation' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await CashOperationModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create cashoperation error:', error);
      res.status(500).json({ error: 'Failed to create cashoperation' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await CashOperationModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'CashOperation not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update cashoperation error:', error);
      res.status(500).json({ error: 'Failed to update cashoperation' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await CashOperationModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'CashOperation not found' });
        return;
      }

      res.json({ message: 'CashOperation deleted successfully' });
    } catch (error) {
      console.error('Delete cashoperation error:', error);
      res.status(500).json({ error: 'Failed to delete cashoperation' });
    }
  }
}
