// Connect to comic-store database

const { Client } = require('pg');

const client = new Client(`postgres://localhost:5432/comic-store`);

module.exports = {
  client
}