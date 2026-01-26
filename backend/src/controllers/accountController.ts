import { Request, Response } from 'express';
import { AccountModel } from '../models/Account';

export class AccountController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await AccountModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all account error:', error);
      res.status(500).json({ error: 'Failed to fetch account' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await AccountModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'Account not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get account by id error:', error);
      res.status(500).json({ error: 'Failed to fetch account' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await AccountModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create account error:', error);
      res.status(500).json({ error: 'Failed to create account' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await AccountModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'Account not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update account error:', error);
      res.status(500).json({ error: 'Failed to update account' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await AccountModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'Account not found' });
        return;
      }

      res.json({ message: 'Account deleted successfully' });
    } catch (error) {
      console.error('Delete account error:', error);
      res.status(500).json({ error: 'Failed to delete account' });
    }
  }
}
