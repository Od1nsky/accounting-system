import { Request, Response } from 'express';
import { ClientModel } from '../models/Client';

export class ClientController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await ClientModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all client error:', error);
      res.status(500).json({ error: 'Failed to fetch client' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await ClientModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'Client not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get client by id error:', error);
      res.status(500).json({ error: 'Failed to fetch client' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await ClientModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create client error:', error);
      res.status(500).json({ error: 'Failed to create client' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await ClientModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'Client not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update client error:', error);
      res.status(500).json({ error: 'Failed to update client' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await ClientModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'Client not found' });
        return;
      }

      res.json({ message: 'Client deleted successfully' });
    } catch (error) {
      console.error('Delete client error:', error);
      res.status(500).json({ error: 'Failed to delete client' });
    }
  }
}
