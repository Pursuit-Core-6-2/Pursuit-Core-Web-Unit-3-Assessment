const pgp = require('pg-promise')();
const connesctionString = "postgress://localhost:5432/marine_bio";
const db = pgp(connesctionString);

module.exports = db