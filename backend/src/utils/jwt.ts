import jwt from 'jsonwebtoken';
import { config } from '../config';
import { JWTPayload } from '../types';

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  } as jwt.SignOptions);
}

export function verifyToken(token: string): JWTPayload {
  try {
    const payload = jwt.verify(token, config.jwtSecret) as JWTPayload;
    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
