const db = require('./index')

const getAll = async () => {
  try {
    let species = await db.any('SELECT * FROM species');
    return species;
  } catch (err) {
    throw err
  }
}

const getById = async (id) => {
  try {
    let specie = await db.any('SELECT * FROM species WHERE id = $1', id);
    return specie[0];
  } catch (err) {
    throw err
  }
}

const add = async (specie) => {
  const insertQuery = `
  INSERT INTO species(name, is_mammal) 
    VALUES($/name/, $/is_mammal/)
    RETURNING *
  `
  try {
    let newSpecie = await db.one(insertQuery, specie);
    return newSpecie;
  } catch (err) {
    throw err
  }
}

module.exports = {
  getAll,
  getById,
  add
}
