const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'admin',
  host: process.env.DB_HOST || 'database',
  database: process.env.POSTGRES_DB || 'myappdb',
  password: process.env.POSTGRES_PASSWORD || '!aS123123',
  port: process.env.DB_PORT || 5432,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
