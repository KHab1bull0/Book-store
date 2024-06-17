

CREATE TABLE IF NOT EXISTS(
    uuid SERIAL PRIMARY KEY,
    email VARCHAR(32) UNIQUE NOT NULL,
    username VARCHAR(32) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    role CHECK (role = 'user')
)