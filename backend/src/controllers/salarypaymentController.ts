import { Request, Response } from 'express';
import { SalaryPaymentModel } from '../models/SalaryPayment';

export class SalaryPaymentController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await SalaryPaymentModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all salarypayment error:', error);
      res.status(500).json({ error: 'Failed to fetch salarypayment' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await SalaryPaymentModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'SalaryPayment not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get salarypayment by id error:', error);
      res.status(500).json({ error: 'Failed to fetch salarypayment' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await SalaryPaymentModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create salarypayment error:', error);
      res.status(500).json({ error: 'Failed to create salarypayment' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await SalaryPaymentModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'SalaryPayment not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update salarypayment error:', error);
      res.status(500).json({ error: 'Failed to update salarypayment' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await SalaryPaymentModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'SalaryPayment not found' });
        return;
      }

      res.json({ message: 'SalaryPayment deleted successfully' });
    } catch (error) {
      console.error('Delete salarypayment error:', error);
      res.status(500).json({ error: 'Failed to delete salarypayment' });
    }
  }
}
