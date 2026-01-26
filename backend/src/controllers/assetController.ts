import { Request, Response } from 'express';
import { AssetModel } from '../models/Asset';

export class AssetController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await AssetModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all asset error:', error);
      res.status(500).json({ error: 'Failed to fetch asset' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await AssetModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'Asset not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get asset by id error:', error);
      res.status(500).json({ error: 'Failed to fetch asset' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await AssetModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create asset error:', error);
      res.status(500).json({ error: 'Failed to create asset' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await AssetModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'Asset not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update asset error:', error);
      res.status(500).json({ error: 'Failed to update asset' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await AssetModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'Asset not found' });
        return;
      }

      res.json({ message: 'Asset deleted successfully' });
    } catch (error) {
      console.error('Delete asset error:', error);
      res.status(500).json({ error: 'Failed to delete asset' });
    }
  }
}
