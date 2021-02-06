DROP TABLE IF EXISTS maps CASCADE;

CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES user(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE
);
