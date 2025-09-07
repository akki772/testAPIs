import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';

export const echoRouter = Router();

// Protected echo endpoint
echoRouter.post('/echo', authMiddleware, (req, res) => {
  res.json({
    ok: true,
    requestId: req.headers['x-request-id'] || null,
    tokenSubject: (req as any).auth?.sub || null,
    payload: req.body
  });
});

// Public echo (optional)
echoRouter.post('/echo/public', (req, res) => {
  res.json({ ok: true, payload: req.body });
});
