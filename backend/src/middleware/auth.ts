import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.js';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization || '';
  const [, token] = auth.split(' ');
  if (!token) return res.status(401).json({ error: 'missing bearer token' });
  try {
    const payload = await verifyToken(token);
    (req as any).auth = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'invalid or expired token' });
  }
}
