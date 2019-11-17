const pg = require('pg-promise')()

const connection = {
    host: 'localhost',
    port: 5432,
    database: 'marine_db',
    user: 'owenjones',
}
// const connection = process.env.DATABASE_URL || "postgres://localhost:5432/marine_db"

const db = pg(connection)

module.exports = db