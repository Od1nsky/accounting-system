import { Request, Response } from 'express';
import { ProjectExpenseModel } from '../models/ProjectExpense';

export class ProjectExpenseController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await ProjectExpenseModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all projectexpense error:', error);
      res.status(500).json({ error: 'Failed to fetch projectexpense' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await ProjectExpenseModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'ProjectExpense not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get projectexpense by id error:', error);
      res.status(500).json({ error: 'Failed to fetch projectexpense' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await ProjectExpenseModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create projectexpense error:', error);
      res.status(500).json({ error: 'Failed to create projectexpense' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await ProjectExpenseModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'ProjectExpense not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update projectexpense error:', error);
      res.status(500).json({ error: 'Failed to update projectexpense' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await ProjectExpenseModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'ProjectExpense not found' });
        return;
      }

      res.json({ message: 'ProjectExpense deleted successfully' });
    } catch (error) {
      console.error('Delete projectexpense error:', error);
      res.status(500).json({ error: 'Failed to delete projectexpense' });
    }
  }
}
