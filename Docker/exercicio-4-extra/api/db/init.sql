CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

INSERT INTO users (name, email)
VALUES
  ('Tiago Gomides', 'gomidestiago@dev.com'),
  ('Erick Turing', 'erickturing@ux.com'),
  ('Ana Luiza', 'analuiza@po.com')
ON CONFLICT DO NOTHING;
