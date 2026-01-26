import { Request, Response } from 'express';
import { TimeEntryModel } from '../models/TimeEntry';

export class TimeEntryController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await TimeEntryModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all timeentry error:', error);
      res.status(500).json({ error: 'Failed to fetch timeentry' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await TimeEntryModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'TimeEntry not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get timeentry by id error:', error);
      res.status(500).json({ error: 'Failed to fetch timeentry' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await TimeEntryModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create timeentry error:', error);
      res.status(500).json({ error: 'Failed to create timeentry' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await TimeEntryModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'TimeEntry not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update timeentry error:', error);
      res.status(500).json({ error: 'Failed to update timeentry' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await TimeEntryModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'TimeEntry not found' });
        return;
      }

      res.json({ message: 'TimeEntry deleted successfully' });
    } catch (error) {
      console.error('Delete timeentry error:', error);
      res.status(500).json({ error: 'Failed to delete timeentry' });
    }
  }
}
