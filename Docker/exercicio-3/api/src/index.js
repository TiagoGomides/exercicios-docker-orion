const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const {
  PORT = 3000,
  DB_HOST = 'db',
  DB_PORT = 5432,
  DB_USER = 'appuser',
  DB_PASS = 'appuser',
  DB_NAME = 'appdb',
} = process.env;

const pool = new Pool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  max: 5,
  idleTimeoutMillis: 10000,
});

app.get('/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get('/items', async (_req, res) => {
  const { rows } = await pool.query('SELECT id, name, created_at FROM items ORDER BY id DESC');
  res.json(rows);
});

app.post('/items', async (req, res) => {
  const { name } = req.body || {};
  if (!name || typeof name !== 'string') return res.status(400).json({ error: 'name é obrigatório' });
  const { rows } = await pool.query(
    'INSERT INTO items (name) VALUES ($1) RETURNING id, name, created_at',
    [name]
  );
  res.status(201).json(rows[0]);
});

app.delete('/items/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'id inválido' });
  await pool.query('DELETE FROM items WHERE id = $1', [id]);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`API rodando em http://0.0.0.0:${PORT} (DB_HOST=${DB_HOST})`);
});
