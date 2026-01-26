import { Request, Response } from 'express';
import { TaskModel } from '../models/Task';

export class TaskController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await TaskModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all task error:', error);
      res.status(500).json({ error: 'Failed to fetch task' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await TaskModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get task by id error:', error);
      res.status(500).json({ error: 'Failed to fetch task' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await TaskModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create task error:', error);
      res.status(500).json({ error: 'Failed to create task' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await TaskModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update task error:', error);
      res.status(500).json({ error: 'Failed to update task' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await TaskModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }

      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Delete task error:', error);
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }
}
