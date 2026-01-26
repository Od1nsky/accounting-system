import { Request, Response } from 'express';
import { TaxRecordModel } from '../models/TaxRecord';

export class TaxRecordController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await TaxRecordModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all taxrecord error:', error);
      res.status(500).json({ error: 'Failed to fetch taxrecord' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await TaxRecordModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'TaxRecord not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get taxrecord by id error:', error);
      res.status(500).json({ error: 'Failed to fetch taxrecord' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await TaxRecordModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create taxrecord error:', error);
      res.status(500).json({ error: 'Failed to create taxrecord' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await TaxRecordModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'TaxRecord not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update taxrecord error:', error);
      res.status(500).json({ error: 'Failed to update taxrecord' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await TaxRecordModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'TaxRecord not found' });
        return;
      }

      res.json({ message: 'TaxRecord deleted successfully' });
    } catch (error) {
      console.error('Delete taxrecord error:', error);
      res.status(500).json({ error: 'Failed to delete taxrecord' });
    }
  }
}
