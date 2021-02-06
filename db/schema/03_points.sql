DROP TABLE IF EXISTS points CASCADE;

CREATE TABLE points (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  longitutde DECIMAL(9,6) NOT NULL,
  latitude DECIMAL(8,6) NOT NULL
);
