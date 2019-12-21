const path = require('path')
const exec = require('child_process').exec

const SQL_FILE_PATH = path.resolve(__dirname, "../db/marine_biology_db.sql")

const resetDB = () => {
  return new Promise((resolve, reject) => {

    console.log('==== RESETTING DB ====')
    exec(`psql -f ${SQL_FILE_PATH}`, (err, stdout, stderr) => {
      if (err) {
        console.error('ERR =>', err);
        reject(err);
      } else if (stderr) {
        console.log('STDER =>', stderr);
      }
      console.log(stdout)
      console.log('==== RESETTED DB ====')
      resolve(stdout)
    })
  })
}

module.exports = resetDB
