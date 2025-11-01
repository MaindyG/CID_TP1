import jwt from 'jsonwebtoken';
import { IUserBase } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();
export const JWT_SECRET = process.env.JWT_SECRET || 'votre_ecret';

export function verifyToken(token: string): any {
    return jwt.verify(token, JWT_SECRET);
}
export const signToken = (payload: IUserBase): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}
