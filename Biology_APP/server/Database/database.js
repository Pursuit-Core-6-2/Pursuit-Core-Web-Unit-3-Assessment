const pgp = require('pg-promise')(); //Import pg-promise
const connectionString = "postgres://localhost:5432/research_db"//URL where Postgres is running
const db = pgp(connectionString)//Connected to db instance

module.exports = db;