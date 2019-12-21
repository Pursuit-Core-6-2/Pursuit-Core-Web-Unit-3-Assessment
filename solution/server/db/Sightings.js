const db = require('./index')

const getAll = async () => {
  const selectQuery = `
    SELECT 
      researchers.id AS researcher_id,
      researchers.name AS researcher_name,
      species.id AS species_id,
      species.name AS species_name,
      habitats.id AS habitat_id,
      habitats.category AS habitat_category
    FROM sightings
      JOIN researchers ON sightings.researcher_id = researchers.id
      JOIN species ON sightings.species_id = species.id
      JOIN habitats ON sightings.habitat_id = habitats.id 
  `
  try {
    let sightings = await db.any(selectQuery)
    return sightings;
  } catch (err) {
    throw err
  }
}

const getAllBy = async (type, typeId) => {
  let selectQuery = `
    SELECT 
      researchers.id AS researcher_id,
      researchers.name AS researcher_name,
      species.id AS species_id,
      species.name AS species_name,
      habitats.id AS habitat_id,
      habitats.category AS habitat_category
    FROM sightings
      JOIN researchers ON sightings.researcher_id = researchers.id
      JOIN species ON sightings.species_id = species.id
      JOIN habitats ON sightings.habitat_id = habitats.id 
  `

  switch (type) {
    case 'researcher':
      selectQuery += 'WHERE researchers.id = $/typeId/'
      break;
    case 'habitat':
      selectQuery += 'WHERE habitats.id = $/typeId/'
      break;
    case 'species':
      selectQuery += 'WHERE species.id = $/typeId/'
      break;
    default:
      break;
  }

  try {
    let sightings = await db.any(selectQuery, { typeId })
    return sightings;
  } catch (err) {
    throw err
  }
}

const add = async (sighting) => {
  let insertQuery = `
    INSERT INTO sightings(researcher_id, species_id, habitat_id) 
      VALUES ($/researcher_id/, $/species_id/, $/habitat_id/) 
      RETURNING *
  `

  try {
    let newSighting = await db.one(insertQuery, sighting)
    return newSighting;
  } catch (err) {
    throw err
  }
}

module.exports = {
  getAll,
  getAllBy,
  add,
  // remove
}
