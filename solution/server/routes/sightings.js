const express = require('express');
const router = express.Router();
const Sightings = require('../db/sightings');

router.get('/', async (req, res, next) => {
  try {
    let sightings = await Sightings.getAll()
    res.json({
      status: 'success',
      message: 'retrieved all sightings',
      payload: sightings
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      status: 'error',
      message: 'failed retrieving all sightings',
      payload: null
    })
  }
})

router.get('/species/:speciesId', async (req, res, next) => {
  const speciesId = req.params.speciesId
  try {
    let sightings = await Sightings.getAllBy('species', speciesId)
    res.json({
      status: 'success',
      message: 'retrieved all sightings by species',
      payload: sightings
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      status: 'error',
      message: 'failed retrieving all sightings by species',
      payload: null
    })
  }
})

router.get('/habitats/:habitatId', async (req, res, next) => {
  const habitatId = req.params.habitatId
  try {
    let sightings = await Sightings.getAllBy('habitat', habitatId)
    res.json({
      status: 'success',
      message: 'retrieved all sightings by habitat',
      payload: sightings
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      status: 'error',
      message: 'failed retrieving all sightings by habitats',
      payload: null
    })
  }
})

router.get('/researchers/:researcherId', async (req, res, next) => {
  const researcherId = req.params.researcherId
  try {
    let sightings = await Sightings.getAllBy('researcher', researcherId)
    res.json({
      status: 'success',
      message: 'retrieved all sightings by researcher',
      payload: sightings
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      status: 'error',
      message: 'failed retrieving all sightings by researchers',
      payload: null
    })
  }
})

// TODO note and solve a lot of repetion in /sightings/species, sightings/habitats/ and sightings/researchers
// let's get rid of it

router.post('/', async (req, res) => {
  let sighting = req.body
  try {
    let sightings = await Sightings.add(sighting)
    res.json({
      status: 'success',
      message: 'added a new sighting',
      payload: sightings
    })

  } catch (err) {
    if (err.code === '23503') { // When violating a foreign key constraint
      res.status(400).json({
        status: 'error',
        message: 'researcher, species or habitat specified does not exists',
        payload: null
      })
    } else {
      console.log(err)
      res.status(500).json({
        status: 'error',
        message: 'failed adding a new sighting',
        payload: null
      })
    }
  }
})

module.exports = router;
