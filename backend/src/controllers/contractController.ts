import { Request, Response } from 'express';
import { ContractModel } from '../models/Contract';

export class ContractController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await ContractModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all contract error:', error);
      res.status(500).json({ error: 'Failed to fetch contract' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await ContractModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'Contract not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get contract by id error:', error);
      res.status(500).json({ error: 'Failed to fetch contract' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await ContractModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create contract error:', error);
      res.status(500).json({ error: 'Failed to create contract' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await ContractModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'Contract not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update contract error:', error);
      res.status(500).json({ error: 'Failed to update contract' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await ContractModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'Contract not found' });
        return;
      }

      res.json({ message: 'Contract deleted successfully' });
    } catch (error) {
      console.error('Delete contract error:', error);
      res.status(500).json({ error: 'Failed to delete contract' });
    }
  }
}
