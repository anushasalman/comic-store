// Connect to comic-store database

const { Client } = require('pg');

const client = new Client(process.env.DATABASE_URL || "postgres://localhost:5432/comic-store");

module.exports = {
  client
}