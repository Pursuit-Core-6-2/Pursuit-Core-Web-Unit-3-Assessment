const db = require('./index')

const add = async (habitat) => {
  try {
    let newHabitat = db.one('INSERT INTO habitats(category) VALUES($/category/) RETURNING *', habitat)
    return newHabitat
  } catch (err) {
    throw err
  }
}

const getAll = async () => {
  try {
    let habitats = db.any('SELECT * FROM habitats')
    return habitats
  } catch (err) {
    throw err
  }
}

const getById = async (id) => {
  try {
    let habitats = await db.any('SELECT * FROM habitats WHERE id = $1', id)
    return habitats[0]
  } catch (err) {
    throw err
  }
}

module.exports = {
  add,
  getAll,
  getById
}

