import { Router } from 'express';
import { signToken, hashPassword, verifyPassword } from '../utils/jwt.js';

// In-memory user store for demo. Replace with DB for production.
const users = new Map<string, { email: string; passwordHash: string }>();

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  if (users.has(email)) return res.status(409).json({ error: 'user already exists' });
  const passwordHash = await hashPassword(password);
  users.set(email, { email, passwordHash });
  return res.status(201).json({ ok: true });
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  const rec = users.get(email);
  if (!rec) return res.status(401).json({ error: 'invalid credentials' });
  const ok = await verifyPassword(password, rec.passwordHash);
  if (!ok) return res.status(401).json({ error: 'invalid credentials' });
  const token = await signToken({ sub: rec.email });
  return res.json({ token });
});
