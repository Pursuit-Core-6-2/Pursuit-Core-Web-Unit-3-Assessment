//pg-promise
const pgp = require('pg-promise')(); 
const connectionString = "postgres://localhost:5432/social_media_app_db" 
const db = pgp(connectionString); 


module.exports = {
    db
}