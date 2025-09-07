import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { authRouter } from './routes/auth.js';
import { echoRouter } from './routes/echo.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'testapi-echo', ts: new Date().toISOString() });
});

app.use('/auth', authRouter);
app.use('/api', echoRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`TestAPI running on :${port}`);
});
