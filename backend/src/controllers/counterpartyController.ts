import { Request, Response } from 'express';
import { CounterpartyModel } from '../models/Counterparty';

export class CounterpartyController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await CounterpartyModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all counterparty error:', error);
      res.status(500).json({ error: 'Failed to fetch counterparty' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await CounterpartyModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'Counterparty not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get counterparty by id error:', error);
      res.status(500).json({ error: 'Failed to fetch counterparty' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await CounterpartyModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create counterparty error:', error);
      res.status(500).json({ error: 'Failed to create counterparty' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await CounterpartyModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'Counterparty not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update counterparty error:', error);
      res.status(500).json({ error: 'Failed to update counterparty' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await CounterpartyModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'Counterparty not found' });
        return;
      }

      res.json({ message: 'Counterparty deleted successfully' });
    } catch (error) {
      console.error('Delete counterparty error:', error);
      res.status(500).json({ error: 'Failed to delete counterparty' });
    }
  }
}
