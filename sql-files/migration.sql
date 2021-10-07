DROP TABLE IF EXISTS pets, owners CASCADE;

CREATE TABLE owners (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT
);

CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    name TEXT,
    kind TEXT,
    age INTEGER,
    owner_id INTEGER NOT NULL REFERENCES owners (id) ON DELETE CASCADE
);

