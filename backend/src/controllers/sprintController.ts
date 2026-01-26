import { Request, Response } from 'express';
import { SprintModel } from '../models/Sprint';

export class SprintController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await SprintModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all sprint error:', error);
      res.status(500).json({ error: 'Failed to fetch sprint' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await SprintModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'Sprint not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get sprint by id error:', error);
      res.status(500).json({ error: 'Failed to fetch sprint' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await SprintModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create sprint error:', error);
      res.status(500).json({ error: 'Failed to create sprint' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await SprintModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'Sprint not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update sprint error:', error);
      res.status(500).json({ error: 'Failed to update sprint' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await SprintModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'Sprint not found' });
        return;
      }

      res.json({ message: 'Sprint deleted successfully' });
    } catch (error) {
      console.error('Delete sprint error:', error);
      res.status(500).json({ error: 'Failed to delete sprint' });
    }
  }
}
