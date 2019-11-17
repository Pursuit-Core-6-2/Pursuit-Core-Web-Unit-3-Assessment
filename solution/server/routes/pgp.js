const pgp =  require('pg-promise')();
const connection = 'postgress://localhost:5432/unit3_db';
const db = pgp(connection);

module.exports = db;