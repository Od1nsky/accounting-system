import { Request, Response } from 'express';
import { RepositoryModel } from '../models/Repository';

export class RepositoryController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await RepositoryModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all repository error:', error);
      res.status(500).json({ error: 'Failed to fetch repository' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await RepositoryModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'Repository not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get repository by id error:', error);
      res.status(500).json({ error: 'Failed to fetch repository' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await RepositoryModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create repository error:', error);
      res.status(500).json({ error: 'Failed to create repository' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await RepositoryModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'Repository not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update repository error:', error);
      res.status(500).json({ error: 'Failed to update repository' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await RepositoryModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'Repository not found' });
        return;
      }

      res.json({ message: 'Repository deleted successfully' });
    } catch (error) {
      console.error('Delete repository error:', error);
      res.status(500).json({ error: 'Failed to delete repository' });
    }
  }
}
