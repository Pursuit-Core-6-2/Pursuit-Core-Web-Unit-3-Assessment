const pgp = require('pg-promise')();

const connectionString = "postgres://localhost:5432/marine_biology_research"
const db = pgp(connectionString);

module.exports = db