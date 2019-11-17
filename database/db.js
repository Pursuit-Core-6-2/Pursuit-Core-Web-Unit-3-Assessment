const pg = require('pg-promise')()

const config = {
    host: 'localhost',
    port: 5432,
    database: 'marine',
    user: 'jenesh'
};

const db = pg(config)
// const db = pg('postgres://localhost:5432/marine')

module.exports = db;