import express from "express";
import { MongoClient } from "mongodb";

const app = express();
const port = process.env.PORT || 3000;

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/?directConnection=true";
const dbName = process.env.DB_NAME || "blog";

let db, posts;

async function start() {
  const client = new MongoClient(mongoUri);
  await client.connect();
  db = client.db(dbName);
  posts = db.collection("posts");

  app.get("/health", (req, res) => res.json({ ok: true }));

  app.get("/posts", async (req, res) => {
    const { autor, tag } = req.query;
    const query = {};
    if (autor) query.autor = autor;
    if (tag) query.tags = tag;
    const result = await posts.find(query).toArray();
    res.json(result);
  });

  app.listen(port, () => {
    console.log(`API listening on :${port}`);
    console.log(`DB: ${dbName} @ ${mongoUri}`);
  });
}

start().catch((err) => {
  console.error("Failed to start:", err);
  process.exit(1);
});
