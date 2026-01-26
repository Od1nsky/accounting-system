import { Request, Response } from 'express';
import { PaymentModel } from '../models/Payment';

export class PaymentController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await PaymentModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all payment error:', error);
      res.status(500).json({ error: 'Failed to fetch payment' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await PaymentModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'Payment not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get payment by id error:', error);
      res.status(500).json({ error: 'Failed to fetch payment' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await PaymentModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create payment error:', error);
      res.status(500).json({ error: 'Failed to create payment' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await PaymentModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'Payment not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update payment error:', error);
      res.status(500).json({ error: 'Failed to update payment' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await PaymentModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'Payment not found' });
        return;
      }

      res.json({ message: 'Payment deleted successfully' });
    } catch (error) {
      console.error('Delete payment error:', error);
      res.status(500).json({ error: 'Failed to delete payment' });
    }
  }
}
