import { Request, Response } from 'express';
import { BudgetModel } from '../models/Budget';

export class BudgetController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await BudgetModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all budget error:', error);
      res.status(500).json({ error: 'Failed to fetch budget' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await BudgetModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'Budget not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get budget by id error:', error);
      res.status(500).json({ error: 'Failed to fetch budget' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await BudgetModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create budget error:', error);
      res.status(500).json({ error: 'Failed to create budget' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await BudgetModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'Budget not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update budget error:', error);
      res.status(500).json({ error: 'Failed to update budget' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await BudgetModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'Budget not found' });
        return;
      }

      res.json({ message: 'Budget deleted successfully' });
    } catch (error) {
      console.error('Delete budget error:', error);
      res.status(500).json({ error: 'Failed to delete budget' });
    }
  }
}
