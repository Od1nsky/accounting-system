import { Request, Response } from 'express';
import { EmployeeModel } from '../models/Employee';

export class EmployeeController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await EmployeeModel.findAll();
      res.json(items);
    } catch (error) {
      console.error('Get all employee error:', error);
      res.status(500).json({ error: 'Failed to fetch employee' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await EmployeeModel.findById(id);

      if (!item) {
        res.status(404).json({ error: 'Employee not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Get employee by id error:', error);
      res.status(500).json({ error: 'Failed to fetch employee' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await EmployeeModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Create employee error:', error);
      res.status(500).json({ error: 'Failed to create employee' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await EmployeeModel.update(id, req.body);

      if (!item) {
        res.status(404).json({ error: 'Employee not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Update employee error:', error);
      res.status(500).json({ error: 'Failed to update employee' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await EmployeeModel.delete(id);

      if (!success) {
        res.status(404).json({ error: 'Employee not found' });
        return;
      }

      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error('Delete employee error:', error);
      res.status(500).json({ error: 'Failed to delete employee' });
    }
  }
}
