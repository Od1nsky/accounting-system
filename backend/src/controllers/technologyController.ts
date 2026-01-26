import { Request, Response } from 'express';
import { TechnologyModel } from '../models/Technology';

export class TechnologyController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await TechnologyModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all technology error:', error);
      res.status(500).json({ error: 'Failed to fetch technology' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await TechnologyModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'Technology not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get technology by id error:', error);
      res.status(500).json({ error: 'Failed to fetch technology' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await TechnologyModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create technology error:', error);
      res.status(500).json({ error: 'Failed to create technology' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await TechnologyModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'Technology not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update technology error:', error);
      res.status(500).json({ error: 'Failed to update technology' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await TechnologyModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'Technology not found' });
        return;
      }

      res.json({ message: 'Technology deleted successfully' });
    } catch (error) {
      console.error('Delete technology error:', error);
      res.status(500).json({ error: 'Failed to delete technology' });
    }
  }
}
