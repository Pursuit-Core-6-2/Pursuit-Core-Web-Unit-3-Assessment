const pgp = require('pg-promise')();
const connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/marine_db";

module.exports = {
  db: pgp(connectionString)
}
