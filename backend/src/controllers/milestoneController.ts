import { Request, Response } from 'express';
import { MilestoneModel } from '../models/Milestone';

export class MilestoneController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await MilestoneModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all milestone error:', error);
      res.status(500).json({ error: 'Failed to fetch milestone' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await MilestoneModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'Milestone not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get milestone by id error:', error);
      res.status(500).json({ error: 'Failed to fetch milestone' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await MilestoneModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create milestone error:', error);
      res.status(500).json({ error: 'Failed to create milestone' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await MilestoneModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'Milestone not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update milestone error:', error);
      res.status(500).json({ error: 'Failed to update milestone' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await MilestoneModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'Milestone not found' });
        return;
      }

      res.json({ message: 'Milestone deleted successfully' });
    } catch (error) {
      console.error('Delete milestone error:', error);
      res.status(500).json({ error: 'Failed to delete milestone' });
    }
  }
}
