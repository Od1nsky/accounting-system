import { Request } from 'express';

// User types
export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt?: string;
}

export interface CreateUser {
  email: string;
  password: string;
  name: string;
  role: string;
}

export interface UpdateUser {
  email?: string;
  password?: string;
  name?: string;
  role?: string;
}

// Auth types
export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthRequest extends Request {
  user?: JWTPayload;
}

// Export all types
export * from './index';
