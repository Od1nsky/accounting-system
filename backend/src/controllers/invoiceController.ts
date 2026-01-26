import { Request, Response } from 'express';
import { InvoiceModel } from '../models/Invoice';

export class InvoiceController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await InvoiceModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all invoice error:', error);
      res.status(500).json({ error: 'Failed to fetch invoice' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await InvoiceModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'Invoice not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get invoice by id error:', error);
      res.status(500).json({ error: 'Failed to fetch invoice' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await InvoiceModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create invoice error:', error);
      res.status(500).json({ error: 'Failed to create invoice' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await InvoiceModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'Invoice not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update invoice error:', error);
      res.status(500).json({ error: 'Failed to update invoice' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await InvoiceModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'Invoice not found' });
        return;
      }

      res.json({ message: 'Invoice deleted successfully' });
    } catch (error) {
      console.error('Delete invoice error:', error);
      res.status(500).json({ error: 'Failed to delete invoice' });
    }
  }
}
