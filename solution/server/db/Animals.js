const db = require('./index')

const getAll = async () => {
  try {
    let animals = await db.any('SELECT * FROM animals');
    return animals;
  } catch (err) {
    throw err
  }
}

const getById = async (id) => {
  try {
    let animal = await db.any('SELECT * FROM animals WHERE id = $1', id);
    return animal[0];
  } catch (err) {
    throw err
  }
}

const add = async (animal) => {
  const insertQuery = `
    INSERT INTO animals(species_id, nickname)
      VALUES ($/species_id/, $/nickname/)
      RETURNING *
  `
  try {
    let newAnimal = await db.one(insertQuery, animal);
    return newAnimal;
  } catch (err) {
    throw err
  }
}

const update = async (id, animalUpdates) => {
  let updateQuery = 'UPDATE animals SET '

  let updateProps = Object.keys(animalUpdates)

  for (let i = 0; i < updateProps.length; i++) {
    let prop = updateProps[i];
    updateQuery += `${prop} = $/${prop}/`

    if (i < updateProps.length - 1) {
      updateQuery += ', '
    }
  }

  updateQuery += ' WHERE id = $/id/ RETURNING *'

  try {
    let updatedAnimal = await db.one(updateQuery, {
      id: id,
      ...animalUpdates
    });
    return updatedAnimal;
  } catch (err) {
    throw err
  }
}

const remove = async (id) => {
  try {
    let removedAnimal = await db.one('DELETE FROM animals WHERE id = $1 RETURNING *', id);
    return removedAnimal;
  } catch (err) {
    throw err
  }
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove
}
