import { Request, Response } from 'express';
import { ProjectModel } from '../models/Project';

export class ProjectController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await ProjectModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all project error:', error);
      res.status(500).json({ error: 'Failed to fetch project' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await ProjectModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get project by id error:', error);
      res.status(500).json({ error: 'Failed to fetch project' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await ProjectModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create project error:', error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await ProjectModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update project error:', error);
      res.status(500).json({ error: 'Failed to update project' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await ProjectModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }

      res.json({ message: 'Project deleted successfully' });
    } catch (error) {
      console.error('Delete project error:', error);
      res.status(500).json({ error: 'Failed to delete project' });
    }
  }
}
