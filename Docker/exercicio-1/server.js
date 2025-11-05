const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (_req, res) => {
  res.send("Hello from Docker!");
});

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
