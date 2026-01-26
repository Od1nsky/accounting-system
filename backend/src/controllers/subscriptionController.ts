import { Request, Response } from 'express';
import { SubscriptionModel } from '../models/Subscription';

export class SubscriptionController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await SubscriptionModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all subscription error:', error);
      res.status(500).json({ error: 'Failed to fetch subscription' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await SubscriptionModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'Subscription not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get subscription by id error:', error);
      res.status(500).json({ error: 'Failed to fetch subscription' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await SubscriptionModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create subscription error:', error);
      res.status(500).json({ error: 'Failed to create subscription' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await SubscriptionModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'Subscription not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update subscription error:', error);
      res.status(500).json({ error: 'Failed to update subscription' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await SubscriptionModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'Subscription not found' });
        return;
      }

      res.json({ message: 'Subscription deleted successfully' });
    } catch (error) {
      console.error('Delete subscription error:', error);
      res.status(500).json({ error: 'Failed to delete subscription' });
    }
  }
}
