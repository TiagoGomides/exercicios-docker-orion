import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import pino from 'pino';

const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport: process.env.NODE_ENV === 'production' ? undefined : { target: 'pino-pretty' }
});

const {
  DB_HOST = 'db',
  DB_PORT = '5432',
  DB_USER = 'appuser',
  DB_PASS = 'supersecret',
  DB_NAME = 'appdb',
  API_PORT = '3000'
} = process.env;

const { Pool } = pkg;
const pool = new Pool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  max: 10,
  idleTimeoutMillis: 30_000
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/health/db', async (_req, res) => {
  try {
    const r = await pool.query('SELECT 1 AS ok');
    res.json({ status: 'ok', db: r.rows[0].ok === 1 });
  } catch (err) {
    logger.error({ err }, 'DB healthcheck failed');
    res.status(500).json({ status: 'error', message: 'DB not reachable' });
  }
});

app.get('/users', async (_req, res) => {
  try {
    const r = await pool.query('SELECT id, name, email, created_at FROM users ORDER BY id ASC');
    res.json({ success: true, data: r.rows });
  } catch (err) {
    logger.error({ err }, 'GET /users failed');
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body ?? {};
  if (!name || !email) return res.status(400).json({ success: false, message: 'name and email are required' });
  try {
    const r = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email, created_at',
      [name, email]
    );
    res.status(201).json({ success: true, data: r.rows[0] });
  } catch (err) {
    logger.error({ err }, 'POST /users failed');
    res.status(500).json({ success: false, message: 'Failed to create user' });
  }
});

app.listen(Number(API_PORT), () => {
  logger.info(`API listening on :${API_PORT} (env: ${process.env.NODE_ENV})`);
});
