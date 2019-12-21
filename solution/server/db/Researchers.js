const db = require('./index')

const getAll = async () => {
  try {
    let researchers = await db.any('SELECT * FROM researchers')
    return researchers;
  } catch (err) {
    throw (err)
  }
}

const add = async (researcher) => {
  try {
    const insertQuery = `
    INSERT INTO researchers(name, job_title) 
      VALUES($/name/, $/job_title/)
      RETURNING *
    `
    let newResearcher = await db.one(insertQuery, researcher);
    return newResearcher;
  } catch (err) {
    throw (err)
  }
}

const getById = async (id) => {
  try {
    let researcher = await db.any('SELECT * FROM researchers WHERE id = $1', id)
    return researcher[0];
  } catch (err) {
    throw (err)
  }
}

const update = async (id, updates) => {
  const updateProps = Object.keys(updates);

  let updateQuery = `UPDATE researchers SET`

  for (let i = 0; i < updateProps.length; i++) {
    let prop = updateProps[i]
    updateQuery += ` ${prop} = $/${prop}/`
    if (i < updateProps.length - 1) {
      updateQuery += ','
    }
  }

  updateQuery += ' WHERE id = $/id/ RETURNING * '
  try {
    let updatedResearcher = await db.any(updateQuery, { id, ...updates });
    return updatedResearcher[0];
  } catch (err) {
    throw (err)
  }
}

const remove = async (id) => {
  try {
    let removedResearcher = await db.any('DELETE FROM researchers WHERE id = $1 RETURNING *', id);
    return removedResearcher[0];
  } catch (err) {
    throw (err)
  }
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove
}
